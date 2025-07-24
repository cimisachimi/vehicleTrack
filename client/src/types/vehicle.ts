export interface Vehicle {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "REFUELING";
  fuel_level: number;
  odometer: number;
  latitude: number;
  longitude: number;
  speed: number;
  updated_at: string;
  destination: string;
  traveled: number;
  refuelStartTime: string | null;
}