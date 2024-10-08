declare namespace SpeedControl {
  export interface TurretConfiguration {
    // Limite de vitesse (en km/h) autorisée sur la section de route surveillée par le radar
    maxSpeed: number;
    // Limite de vitesse (en km/h) autorisée pour temps de pluie
    rainingMaxSpeed?: number;
  }

  export interface SensorData {
    // Vitesse (en km/h) détectée par le radar
    speed: number;
    // plaque d'immatriculation du véhicule contrôlé
    vehicleLicensePlate: string;
    // Est-ce qu'il pleut sur la route surveillée
    raining?: boolean;
  }

  export interface TurretResponse {
    // plaque d'immatriculation du véhicule contrôlé
    vehicleLicensePlate: string;
    // Est-ce que le véhicule contrôlé est en excès de vitesse ou non
    speeding: boolean;
    // Vitesse retenue pour le véhicule contrôlé
    legalSpeed: number;
    // Différence entre la vitesse maximale autorisée et la vitesse retenue pour le véhicule contrôlé
    delta: number;
  }

  export type mainFunction = (
    turretConfiguration: TurretConfiguration,
    sensorData: SensorData
  ) => TurretResponse;
}
