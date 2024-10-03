const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  const { maxSpeed } = _turretConfiguration;
  const { speed, vehicleLicensePlate } = _sensorData;

  let legalSpeed = 0;

  switch (true) {
    case speed < 100:
      legalSpeed = speed - 5;
      break;
    case speed > 100:
      legalSpeed = speed * 0.95;
      break;
  }

  return {
    speeding: speed >= maxSpeed,
    delta: speed >= maxSpeed ? Math.ceil(legalSpeed - maxSpeed) : 0,
    legalSpeed: Math.ceil(legalSpeed),
    vehicleLicensePlate: vehicleLicensePlate,
  };
};

export default main;
