import { create } from "zustand";
import type { Vehicle } from "../types/vehicle";
import type { VehicleTrack } from "../types/vehicleTrack";
import { getVehicles, getVehicleById, getVehicleTrackById } from "../api/vehicles";

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  vehicleTrack: VehicleTrack[];
  loading: boolean;
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: number) => Promise<void>;
  fetchVehicleTrackById: (id: number) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  vehicleTrack: [],
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

  fetchVehicleTrackById: async (id: number) => {
    const data = await getVehicleTrackById(id);
    set({ vehicleTrack: data });
  },
}));