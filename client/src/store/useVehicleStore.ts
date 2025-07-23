import { create } from "zustand";
import type { Vehicle } from "../types/vehicle";
import { getVehicles, getVehicleById } from "../api/vehicles";

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: number) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,

  fetchVehicles: async () => {
    set({ loading: true });
    const data = await getVehicles();
    set({ vehicles: data, loading: false });
  },

  fetchVehicleById: async (id: number) => {
    set({ loading: true });
    const data = await getVehicleById(id);
    set({ selectedVehicle: data, loading: false });
  },
}));
