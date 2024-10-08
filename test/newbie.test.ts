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
    maxSpeed: 30,
  },
  {
    speed: 45,
    vehicleLicensePlate,
    newbie: true,
  },
  {
    speeding: true,
    legalSpeed: 40,
    delta: 10,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    newbieMaxSpeed: 110,
  },
  {
    speed: 149,
    vehicleLicensePlate,
    newbie: true,
    raining: true,
  },
  {
    speeding: true,
    legalSpeed: 142,
    delta: 32,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    newbieMaxSpeed: 110,
    rainingMaxSpeed: 110,
  },
  {
    speed: 89,
    vehicleLicensePlate,
    raining: true,
  },
  {
    speeding: false,
    legalSpeed: 84,
    delta: 0,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    newbieMaxSpeed: 90,
    rainingMaxSpeed: 110,
  },
  {
    speed: 121,
    vehicleLicensePlate,
    raining: true,
    newbie: true,
  },
  {
    speeding: true,
    legalSpeed: 115,
    delta: 25,
    vehicleLicensePlate,
  },
]);

describe('Speed Control - newbie feature', function () {
  it.each(cases)(
    'turretConf: %s | sensorData %s ==> %s',
    async (turretConf, sensorData, expectedResult): Promise<void> => {
      const result = main(turretConf, sensorData);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});