const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  const { maxSpeed, rainingMaxSpeed, newbieMaxSpeed, truckMaxSpeed } =
    _turretConfiguration;
  const { speed, vehicleLicensePlate, raining, newbie, truck } = _sensorData;

  let legalSpeed = 0;
  const speedArray = [maxSpeed];

  if (raining && rainingMaxSpeed) {
    speedArray.push(rainingMaxSpeed);
  }

  if (newbie && newbieMaxSpeed) {
    speedArray.push(newbieMaxSpeed);
  }

  if (truck && truckMaxSpeed) {
    speedArray.push(truckMaxSpeed);
  }

  const totalSpeed = Math.min(...speedArray);

  switch (true) {
    case speed < 100:
      legalSpeed = speed - 5;
      break;
    case speed > 100:
      legalSpeed = speed * 0.95;
      break;
  }

  return {
    speeding: speed >= totalSpeed,
    delta: speed >= totalSpeed ? Math.ceil(legalSpeed - totalSpeed) : 0,
    legalSpeed: Math.ceil(legalSpeed),
    vehicleLicensePlate: vehicleLicensePlate,
  };
};

export default main;
