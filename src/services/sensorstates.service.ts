process.env['NODE_CONFIG_DIR'] = __dirname + '/../configs';
import config from 'config';
import { DumpedSensorState, SensorState, TimedSensorState } from '@/interfaces/sensorstates.interface';
import { logger } from '@/utils/logger';

export class SensorStatesService {
  #state: Map<string, TimedSensorState> = new Map();
  #staleInterval: number = config.get('staleInterval');

  public update(id: string, newState: SensorState): void {
    const timed: TimedSensorState = {
      state: newState,
      lastUpdated: Date.now(),
    };

    logger.info(`Update: ${id} -> ${newState}`);
    this.#state.set(id, timed);
  }

  private isStale(state: TimedSensorState): boolean {
    return state.lastUpdated + this.#staleInterval < Date.now();
  }

  public get(id: string): [SensorState, boolean] {
    const res = this.#state.get(id);

    return [res.state, this.isStale(res)];
  }

  public keys(): IterableIterator<string> {
    return this.#state.keys();
  }

  public dump(): DumpedSensorState[] {
    return [...this.#state].map<DumpedSensorState>(x => ({
      name: x[0],
      stale: this.isStale(x[1]),
      lastUpdated: x[1].lastUpdated,
      state: x[1].state,
    }));
  }
}

const sensorStatesService = new SensorStatesService();

export default sensorStatesService;
