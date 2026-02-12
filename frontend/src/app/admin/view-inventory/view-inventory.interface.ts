// inventory.interface.ts

// 1. RAW Backend Shapes (Exactly as they come from .NET)
export interface RawVehicle {
  dealerId: string;
  vehicleId: string;
  isAvailable: boolean;
  modelInfo: string;
  price: number;
  availableUnits: number | null; // New Column
}

export interface RawSparePart {
  dealerId: string;
  sparePartId: string;
  sparePartName: string;
  isAvailable: boolean;
  sparePartPrice: number;
  availableUnits: number | null; // New Column
}

export interface RawInventoryResponse {
  vehicles: RawVehicle[];
  spareParts: RawSparePart[];
}

// 2. FRONTEND Shapes (As used in your HTML/Components)
export interface VehicleStock {
  modelNo: number;
  modelName: string;
  unitPriceINR: number;
  units: number;
}

export interface SparePart {
  partID: number;
  partName: string;
  costINR: number;
  units: number; // Added units to match the new schema
}

export interface InventoryResponse {
  vehicles: VehicleStock[]; 
  spareParts: SparePart[];
}