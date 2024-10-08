const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  const { maxSpeed, rainingMaxSpeed, newbieMaxSpeed } = _turretConfiguration;
  const { speed, vehicleLicensePlate, raining, newbie } = _sensorData;

  let legalSpeed = 0;
  let totalSpeed = maxSpeed;

  if (raining && rainingMaxSpeed) {
    totalSpeed = rainingMaxSpeed;
  }

  if (newbie && newbieMaxSpeed) {
    totalSpeed = newbieMaxSpeed;
  }

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
