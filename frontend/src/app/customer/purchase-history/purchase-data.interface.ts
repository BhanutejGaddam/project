export interface purchaseHistory{
    slno:number,
    date:string,
    warrantyavailed:'Yes'|'No',
    warrantyServices: string[],
    Repairs:'Yes'|'No',
    routineMaintanance:'Yes'|'No',
    amountPaid:number
}

// history.interface.ts

// 1. Represents the raw response from the C# API
export interface ServiceHistoryResponse {
  bookingId: number;
  customerId: string;
  fullName: string;
  contactNumber: string;
  emergencyContact: string;
  emailAddress: string;
  address: string;
  vehicleModelYear: string;
  vinChassisNumber: string;
  registrationNumber: string;
  currentMileage: number;
  fuelType: string;
  typeOfService: string;
  descriptionOfIssues: string;
  preferredServicePackage: string;
  previousServiceHistory: string;
  slot: string;
  pickup_Dropoff: boolean;
  availed_Warranty: boolean;
  
  // Warranty booleans
  engine_Check: boolean;
  brake_Inspection: boolean;
  oil_Change: boolean;
  transmission_Service: boolean;
  battery_Replacement: boolean;
  tire_Rotation: boolean;
  suspension_Check: boolean;
  electrical_System: boolean;
  cooling_System: boolean;
  exhaust_System: boolean;
  
  selected_Dealer_Id: string | null;
  selected_Dealer: string | null;
  totalBill: number;
  bookingStatus: string;
  createdAt: string;
}

// 2. Represents the mapped data used by your HTML table
export interface DisplayHistoryItem {
  slno: number;
  date: string;
  warrantyavailed: string;
  warrantyServices: string[];
  Repairs: string;
  routineMaintanance: string;
  amountPaid: number;
}