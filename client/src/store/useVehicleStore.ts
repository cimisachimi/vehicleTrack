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
    try {
      const data = await getVehicles();
      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
        set({ vehicles: data, loading: false });
      } else {
        // If data is not an array, log an error and set vehicles to an empty array
        console.error("API did not return an array for vehicles:", data);
        set({ vehicles: [], loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      set({ vehicles: [], loading: false }); // Set to empty array on error
    }
  },

  fetchVehicleById: async (id: number) => {
    set({ loading: true });
    try {
      const data = await getVehicleById(id);
      set({ selectedVehicle: data, loading: false });
    } catch (error) {
      console.error(`Failed to fetch vehicle with id ${id}:`, error);
      set({ selectedVehicle: null, loading: false });
    }
  },

  fetchVehicleTrackById: async (id: number) => {
    try {
      const data = await getVehicleTrackById(id);
       if (Array.isArray(data)) {
        set({ vehicleTrack: data });
      } else {
        console.error("API did not return an array for vehicle track:", data);
        set({ vehicleTrack: [] });
      }
    } catch (error) {
      console.error(`Failed to fetch vehicle track for id ${id}:`, error);
      set({ vehicleTrack: [] });
    }
  },
}));