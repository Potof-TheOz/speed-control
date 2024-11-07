const main: SpeedControl.mainFunction = function (
  _turretConfiguration,
  _sensorData
) {
  const {
    maxSpeed,
    rainingMaxSpeed,
    newbieMaxSpeed,
    truckMaxSpeed,
    minSpeedOnLeftLine,
  } = _turretConfiguration;
  const {
    speed,
    vehicleLicensePlate,
    raining,
    newbie,
    truck,
    onLeftLine,
    fluentTraffic,
  } = _sensorData;

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

  let lowSpeeding = false;

  if (
    onLeftLine &&
    fluentTraffic &&
    minSpeedOnLeftLine &&
    speed <= minSpeedOnLeftLine
  ) {
    lowSpeeding = true;
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

  const calcDelta =
    speed >= totalSpeed ? Math.ceil(legalSpeed - totalSpeed) : 0;

  const resultControlSpeeding: SpeedControl.TurretResponseSpeeding = {
    delta: calcDelta,
    legalSpeed: Math.ceil(legalSpeed),
    vehicleLicensePlate: vehicleLicensePlate,
    speeding: speed >= totalSpeed,
  };

  const resultControlLowSpeeding: SpeedControl.TurretResponseLowSpeeding = {
    delta: minSpeedOnLeftLine ? legalSpeed - minSpeedOnLeftLine : 0,
    legalSpeed: Math.ceil(legalSpeed),
    vehicleLicensePlate: vehicleLicensePlate,
    lowSpeeding: lowSpeeding,
  };

  if (lowSpeeding) {
    return resultControlLowSpeeding;
  } else {
    return resultControlSpeeding;
  }
};

export default main;
