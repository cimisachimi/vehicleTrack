import api from "./axiosInstance";
import type { Vehicle } from "../types/vehicle";

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await api.get("/vehicles");
  return res.data;
};

export const getVehicleById = async (id: number): Promise<Vehicle> => {
  const res = await api.get(`/vehicles/${id}`);
  return res.data;
};
