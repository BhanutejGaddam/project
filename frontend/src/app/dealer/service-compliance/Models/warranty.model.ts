// src/app/service-compliance/models/warranty.model.ts
export type WarrantyStatus = 'ACTIVE' | 'EXPIRED' | 'VOID';

export interface Warranty {
  warrantyId?: number;
  vehicleId: string;
  coverageDetails: string;
  issuedDate: string; // ISO, e.g. '2025-01-01'
  expiryDate: string; // ISO
  dealerId: number;
  status: WarrantyStatus;
}
