// src/app/bookingData.ts

export interface BookingData {
  // 🔑 Personal Information
  ownerName: string;
  phone: string;
  email: string;
  address: string;

  // 🚗 Vehicle Information
  makeModelYear: string;
  vin: string;
  registration: string;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';

  // 🛠️ Service Details
  serviceType: 'routine' | 'repair' | 'annual';
  issues: string;
  package: 'basic' | 'comprehensive' | 'manufacturer';
  history: string;

  // 📅 Logistics
  serviceDate: string; // ISO datetime string
  pickupDrop: 'none' | 'pickup' | 'dropoff' | 'both';
  emergencyContact?: string;

  // Warranty Section
  warranty: 'yes' | 'no';
  warrantySelections: string[];

  serviceStatus:'BOOKED'| 'VEHICLE_RECEIVED'| 'SERVICE_IN_PROGRESS'| 'COMPLETED';
  serviceId: string;
}

// // Hardcoded data for five customers
export const bookingDataList: BookingData[] = [
  {
    ownerName: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@example.com',
    address: 'Pune, Maharashtra, India',
    makeModelYear: 'Honda City 2019',
    vin: 'HND1234567890',
    registration: 'MH12AB1234',
    mileage: 45000,
    fuelType: 'petrol',
    serviceType: 'routine',
    issues: 'Oil change and brake inspection',
    package: 'basic',
    history: 'Last serviced in June 2024',
    serviceDate: '2025-01-10T10:00',
    pickupDrop: 'pickup',
    emergencyContact: '9123456789',
    warranty: 'no',
    warrantySelections: [],
    serviceStatus:'VEHICLE_RECEIVED',
    serviceId: 'SRV1001'
  },
  {
    ownerName: 'Sneha Patil',
    phone: '9988776655',
    email: 'sneha.patil@example.com',
    address: 'Mumbai, Maharashtra, India',
    makeModelYear: 'Toyota Corolla 2020',
    vin: 'TYT9876543210',
    registration: 'MH01CD5678',
    mileage: 30000,
    fuelType: 'diesel',
    serviceType: 'annual',
    issues: 'General annual service',
    package: 'manufacturer',
    history: 'Annual service done in Jan 2024',
    serviceDate: '2026-01-15T14:30',
    pickupDrop: 'dropoff',
    emergencyContact: '9876501234',
    warranty: 'yes',
    warrantySelections: ['Engine Check', 'Brake Inspection'],
    serviceStatus:'BOOKED',
    serviceId: 'SRV1002'
  },
  {
    ownerName: 'Amit Verma',
    phone: '9123456780',
    email: 'amit.verma@example.com',
    address: 'Delhi, India',
    makeModelYear: 'Maruti Swift 2018',
    vin: 'MRT1230987654',
    registration: 'DL05EF4321',
    mileage: 60000,
    fuelType: 'petrol',
    serviceType: 'repair',
    issues: 'Strange noise from suspension',
    package: 'comprehensive',
    history: 'Major repair in Dec 2023',
    serviceDate: '2026-01-20T09:00',
    pickupDrop: 'none',
    emergencyContact: '9988123456',
    warranty: 'no',
    warrantySelections: [],
    serviceStatus:'BOOKED',
    serviceId: 'SRV1003'
  },
  {
    ownerName: 'Priya Nair',
    phone: '9765432109',
    email: 'priya.nair@example.com',
    address: 'Bangalore, Karnataka, India',
    makeModelYear: 'Hyundai Creta 2021',
    vin: 'HYD6543210987',
    registration: 'KA03GH7654',
    mileage: 20000,
    fuelType: 'diesel',
    serviceType: 'routine',
    issues: 'Battery replacement',
    package: 'basic',
    history: 'Routine service in Aug 2024',
    serviceDate: '2026-01-25T11:00',
    pickupDrop: 'both',
    emergencyContact: '9112233445',
    warranty: 'yes',
    warrantySelections: ['Battery Replacement', 'Electrical System'],
    serviceStatus:'BOOKED',
    serviceId: 'SRV1004'
  },
  {
    ownerName: 'Arjun Mehta',
    phone: '9090909090',
    email: 'arjun.mehta@example.com',
    address: 'Ahmedabad, Gujarat, India',
    makeModelYear: 'Tata Nexon EV 2022',
    vin: 'TAT1122334455',
    registration: 'GJ01JK1234',
    mileage: 15000,
    fuelType: 'electric',
    serviceType: 'annual',
    issues: 'General EV checkup',
    package: 'manufacturer',
    history: 'First service in Feb 2024',
    serviceDate: '2026-02-01T15:00',
    pickupDrop: 'pickup',
    emergencyContact: '9001122334',
    warranty: 'yes',
    warrantySelections: ['Electrical System', 'Cooling System'],
    serviceStatus:'BOOKED',
    serviceId: 'SRV1005'
  }
];
