declare namespace SpeedControl {
  export interface TurretConfiguration {
    // Limite de vitesse (en km/h) autorisée sur la section de route surveillée par le radar
    maxSpeed: number;
    // Limite de vitesse (en km/h) autorisée pour temps de pluie
    rainingMaxSpeed?: number;
    // Limite de vitesse (en km/h) autorisée pour les jeunes conducteurs
    newbieMaxSpeed?: number;
    // Limite de vitesse (en km/h) autorisée pour les poids lourds
    truckMaxSpeed?: number;
    // Vitesse minimale (en km/h) autorisée sur la voie de gauche
    minSpeedOnLeftLine?: number;
  }

  export interface SensorData {
    // Vitesse (en km/h) détectée par le radar
    speed: number;
    // plaque d'immatriculation du véhicule contrôlé
    vehicleLicensePlate: string;
    // Est-ce qu'il pleut sur la route surveillée
    raining?: boolean;
    // Est-ce que le véhicule est identifié en tant que jeune conducteur?
    newbie?: boolean;
    // Est-ce que le véhicule est un poids lourd
    truck?: boolean;
    // Est-ce que le véhicule contrôlé est sur la voie la plus à gauche du traffic
    onLeftLine?: boolean;
    // Est-ce que le traffic est fluide?
    fluentTraffic?: boolean;
  }

  export interface TurretResponseSpeeding {
    // plaque d'immatriculation du véhicule contrôlé
    vehicleLicensePlate: string;
    // Est-ce que le véhicule contrôlé est en excès de vitesse ou non
    speeding?: boolean;
    // Vitesse retenue pour le véhicule contrôlé
    legalSpeed: number;
    // Différence entre la vitesse maximale autorisée et la vitesse retenue pour le véhicule contrôlé
    delta: number;
  }
  export type TurretResponseLowSpeeding = Omit<
    TurretResponseSpeeding,
    'speeding'
  > & {
    // Est-ce que le véhicule contrôlé est en excès de vitesse ou non
    lowSpeeding: boolean;
  };

  export type TurretResponse =
    | TurretResponseLowSpeeding
    | TurretResponseSpeeding;

  export type mainFunction = (
    turretConfiguration: TurretConfiguration,
    sensorData: SensorData
  ) => TurretResponse;
}
