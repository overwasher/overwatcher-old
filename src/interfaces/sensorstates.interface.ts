import { Request } from 'express';

export type SensorState = 'active' | 'inactive' | 'unknown';

export interface TimedSensorState {
  state: SensorState;
  lastUpdated: number;
}

export interface DumpedSensorState {
  id: string;
  state: SensorState;
  lastContact: number;
}

export interface RequestWithSensorId extends Request {
  sensorId: string;
}
