import { Request } from 'express';

export type SensorState = 'active' | 'inactive';

export interface TimedSensorState {
  state: SensorState;
  lastUpdated: number;
}

export interface DumpedSensorState {
  name: string;
  state: SensorState;
  lastUpdated: number;
  stale: boolean;
}

export interface RequestWithSensorId extends Request {
  sensorId: string;
}
