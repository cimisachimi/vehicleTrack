import api from "./axiosInstance";
import type { Vehicle } from "../types/vehicle";
import type { VehicleTrack } from "../types/vehicleTrack";

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await api.get("/vehicles");
  return res.data;
};

export const getVehicleById = async (id: number): Promise<Vehicle> => {
  const res = await api.get(`/vehicles/${id}`);
  return res.data;
};

export const getVehicleTrackById = async (id: number): Promise<VehicleTrack[]> => {
  const res = await api.get(`/vehicles/${id}/track`);
  return res.data;
};
