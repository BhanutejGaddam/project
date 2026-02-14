export interface ServiceHistory {
    bookingId: number;
    date: string; // From 'Slot' in DB
    status: string; // From 'BookingStatus'
    typeOfService: string;
    warrantyAvailed: 'Yes' | 'No'; // Mapped from bool Availed_Warranty
    warrantyServices: string[]; // Aggregated from the various boolean flags
    repairs: 'Yes' | 'No'; 
    routineMaintenance: 'Yes' | 'No';
    totalBill: number; // You might need to add this column to your DB later
}

export interface CustomerServiceRecord {
    customerName: string;
    customerId: string;
    vehicleId: string; // Mapping to RegistrationNumber or VIN
    history: ServiceHistory[];
}