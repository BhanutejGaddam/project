// tracking.interface.ts

// 1. Matches the API response exactly
export interface TrackedBooking {
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
  bookingStatus: "BOOKED" | "VEHICLE_RECEIVED" | "SERVICE_IN_PROGRESS" | "COMPLETED"; 
  createdAt: string;
}

// 2. Strongly types the timeline objects your component creates
export interface TimelineStage {
  key: string;
  title: string;
  meta: string | null;
}