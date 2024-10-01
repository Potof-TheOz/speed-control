const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  // code here bros!
  // force et honneur
  //if (_turretConfiguration.maxSpeed < _sensorData.speed) {
  //}

  let legalSpeed = 0;

  if (
    _turretConfiguration.maxSpeed >= 50 &&
    _turretConfiguration.maxSpeed <= 100
  ) {
    legalSpeed = _sensorData.speed - 5;
  }

  return {
    speeding: false,
    delta: 0,
    legalSpeed: 0,
    vehicleLicensePlate: _sensorData.vehicleLicensePlate,
  };
};

export default main;
