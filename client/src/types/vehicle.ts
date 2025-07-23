export interface Vehicle {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  fuel_level: number;
  odometer: number;
  latitude: number;
  longitude: number;
  speed: number;
  updated_at: string;
}
