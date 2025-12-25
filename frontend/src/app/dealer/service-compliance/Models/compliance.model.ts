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
