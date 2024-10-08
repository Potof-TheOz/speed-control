const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  const { maxSpeed, rainingMaxSpeed } = _turretConfiguration;
  const { speed, vehicleLicensePlate, raining } = _sensorData;

  let legalSpeed = 0;
  let totalSpeed = maxSpeed;

  if (raining && rainingMaxSpeed) {
    totalSpeed = rainingMaxSpeed;
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
