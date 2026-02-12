export type WarrantyStatus = 'ACTIVE' | 'EXPIRED' | 'VOID';

export interface Warranty {
  warrantyId?: number;        // Local serial number for UI
  vehicleId: string;         // Maps to [Vehicle_Number] (Primary Key)
  issuedDate: string;        // Maps to [Issued_date]
  expiryDate: string;        // Maps to [expiry_date]
  status: WarrantyStatus;    // Maps to [status]
}