// booking.interface.ts

export interface ServiceBooking {
  customerId: string;
  fullName: string;
  contactNumber: string;
  emergencyContact?: string | null;
  emailAddress: string;
  address: string;
  vehicleModelYear: string;
  vinChassisNumber: string;
  registrationNumber: string;
  currentMileage: number;
  fuelType: string;
  typeOfService: string;
  descriptionOfIssues?: string;
  preferredServicePackage: string;
  previousServiceHistory?: string;
  slot: string; // From datetime-local, this is usually a string
  pickup_Dropoff: boolean;
  availed_Warranty: boolean;
  
  // Warranty Services (Booleans)
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
  
  totalBill: number;
  bookingStatus: string;
  createdAt: string;
}

// Optional: A generic interface for the response you get from the API
export interface BookingResponse {
  message?: string;
  bookingId?: string | number;
  // Add any other specific fields your C# API returns upon success
}