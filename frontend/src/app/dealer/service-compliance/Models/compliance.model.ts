// src/app/service-compliance/models/compliance.model.ts
export type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING';

export interface ComplianceRecord {
  complianceId?: number;
  vehicleId: string;
  PollutionCheck: string; 
  fitness: string;
  RC: string;
  checkDate: string; // ISO
  expiryDate: string; // ISO
  
}

// 2. NEW: Represents the raw JSON coming from your C# API
export interface ComplianceApiResponse {
  vehicleNumber: string;
  pollutionCheck: string;
  fitnessCheck: string;
  rcCheck: string;
  lastChecked: string;
  expiry: string;
  dealerId?: string;
  customer_id?: string;
}

// 3. NEW: Represents the success message when deleting a record
export interface DeleteComplianceResponse {
  message: string;
}