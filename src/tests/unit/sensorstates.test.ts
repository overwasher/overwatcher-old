import { SensorStatesService } from '@/services/sensorstates.service';

describe('Testing Sensorstate', () => {
  beforeEach(() => jest.useFakeTimers());

  test('basic', () => {
    jest.setSystemTime(0);

    const sensorStates = new SensorStatesService();

    expect(sensorStates.dump()).toStrictEqual([]);

    sensorStates.update('key-1', 'active');

    expect(sensorStates.get('key-1')).toStrictEqual({ id: 'key-1', lastContact: 0, state: 'active' });

    sensorStates.update('key-1', 'inactive');

    expect(sensorStates.get('key-1')).toStrictEqual({ id: 'key-1', lastContact: 0, state: 'inactive' });

    expect(sensorStates.dump()).toStrictEqual([{ id: 'key-1', lastContact: 0, state: 'inactive' }]);
  });
  test('stale', () => {
    jest.setSystemTime(0);

    const sensorStates = new SensorStatesService();
    sensorStates.update('key-1', 'active');

    jest.setSystemTime(62000);

    expect(sensorStates.get('key-1')).toStrictEqual({ id: 'key-1', lastContact: 0, state: 'unknown' });

    expect(sensorStates.dump()).toStrictEqual([{ id: 'key-1', lastContact: 0, state: 'unknown' }]);
  });
  test('keys', () => {
    jest.setSystemTime(0);

    const sensorStates = new SensorStatesService();
    sensorStates.update('key-1', 'active');
    sensorStates.update('key-2', 'inactive');

    expect([...sensorStates.keys()]).toStrictEqual(['key-1', 'key-2']);
  });

  afterEach(() => jest.useRealTimers());
});
