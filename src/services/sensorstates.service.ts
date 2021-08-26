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

  private mapSensorState(id: string, state: TimedSensorState): DumpedSensorState {
    const stale = this.isStale(state);

    return <DumpedSensorState>{
      id,
      lastContact: state.lastUpdated,
      state: stale ? 'unknown' : state.state,
    };
  }

  public get(id: string): DumpedSensorState {
    const res = this.#state.get(id);
    return this.mapSensorState(id, res);
  }

  public keys(): IterableIterator<string> {
    return this.#state.keys();
  }

  public dump(): DumpedSensorState[] {
    return [...this.#state].map<DumpedSensorState>(s => this.mapSensorState(s[0], s[1]));
  }
}

const sensorStatesService = new SensorStatesService();

export default sensorStatesService;
