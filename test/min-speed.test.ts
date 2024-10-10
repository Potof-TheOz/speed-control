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
    maxSpeed: 130,
    minSpeedOnLeftLine: 60,
  },
  {
    speed: 122,
    vehicleLicensePlate,
  },
  {
    speeding: false,
    legalSpeed: 116,
    delta: 0,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    minSpeedOnLeftLine: 60,
  },
  {
    speed: 43,
    vehicleLicensePlate,
    onLeftLine: false,
  },
  {
    speeding: false,
    legalSpeed: 38,
    delta: 0,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    minSpeedOnLeftLine: 60,
  },
  {
    speed: 43,
    vehicleLicensePlate,
    onLeftLine: true,
    fluentTraffic: false,
  },
  {
    speeding: false,
    legalSpeed: 38,
    delta: 0,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    minSpeedOnLeftLine: 60,
  },
  {
    speed: 43,
    vehicleLicensePlate,
    onLeftLine: true,
    fluentTraffic: true,
  },
  {
    lowSpeeding: true,
    legalSpeed: 38,
    delta: -22,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
  },
  {
    speed: 120,
    vehicleLicensePlate,
    onLeftLine: true,
    fluentTraffic: true,
  },
  {
    speeding: false,
    legalSpeed: 114,
    delta: 0,
    vehicleLicensePlate,
  },
]);

describe('Speed Control - min speed feature', function () {
  it.each(cases)(
    'turretConf: %s | sensorData %s ==> %s',
    async (turretConf, sensorData, expectedResult): Promise<void> => {
      const result = main(turretConf, sensorData);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
