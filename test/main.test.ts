import main from '../src/main';
import { randomUUID } from 'node:crypto';

type Item = [
  SpeedControl.TurretConfiguration,
  SpeedControl.SensorData,
  SpeedControl.TurretResponse,
];
const cases: Item[] = [];

const vehicleLicensePlate = randomUUID().split('-').shift() ?? '';

cases.push([
  {
    maxSpeed: 50,
  },
  {
    speed: 45,
    vehicleLicensePlate,
  },
  {
    speeding: false,
    legalSpeed: 40,
    delta: 0,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 110,
  },
  {
    speed: 149,
    vehicleLicensePlate,
  },
  {
    speeding: true,
    legalSpeed: 142,
    delta: 32,
    vehicleLicensePlate,
  },
]);

describe('Speed Control', function () {
  it.each(cases)(
    'turretConf: %s | sensorData %s ==> %s',
    async (turretConf, sensorData, expectedResult): Promise<void> => {
      const result = main(turretConf, sensorData);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
