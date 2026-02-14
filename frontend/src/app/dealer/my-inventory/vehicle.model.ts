export interface VehicleInventory {
  dealerId?: string;
  vehicleId: string;
  isAvailable: boolean;
  modelInfo: string;
  price: number;
  availableUnits?: number;
}

export interface SparePartInventory {
  dealerId?: string;
  sparePartId: string;
  sparePartName: string;
  isAvailable: boolean;
  sparePartPrice: number;
  availableUnits?: number;
}

export interface InventoryResponse {
  dealerId: string;
  vehicles: VehicleInventory[];
  spareParts: SparePartInventory[];
}