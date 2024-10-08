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
    truck: true,
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
    truckMaxSpeed: 100,
    rainingMaxSpeed: 90,
  },
  {
    speed: 149,
    vehicleLicensePlate,
    newbie: true,
    truck: true,
    raining: true,
  },
  {
    speeding: true,
    legalSpeed: 142,
    delta: 52,
    vehicleLicensePlate,
  },
]);

cases.push([
  {
    maxSpeed: 130,
    truckMaxSpeed: 100,
  },
  {
    speed: 89,
    vehicleLicensePlate,
    truck: true,
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
    truckMaxSpeed: 90,
  },
  {
    speed: 121,
    vehicleLicensePlate,
    raining: true,
    newbie: true,
    truck: true,
  },
  {
    speeding: true,
    legalSpeed: 115,
    delta: 25,
    vehicleLicensePlate,
  },
]);

describe('Speed Control - truck feature', function () {
  it.each(cases)(
    'turretConf: %s | sensorData %s ==> %s',
    async (turretConf, sensorData, expectedResult): Promise<void> => {
      const result = main(turretConf, sensorData);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
