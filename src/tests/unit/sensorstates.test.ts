import request from 'supertest';
import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { SensorStatesService } from '@/services/sensorstates.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Sensorstate', () => {
  test('basic', () => {
    const sensorStates = new SensorStatesService();

    expect(sensorStates.dump()).toStrictEqual([]);

    sensorStates.update('key-1', 'active');

    expect(sensorStates.get('key-1')).toStrictEqual(['active', false]);
  });
});
