// customer.interface.ts

// 1. Represents the raw response from your GET API
export interface CustomerApiResponse {
  customerId: string;
  cFirstName: string;
  cMiddleName: string;
  cLastName: string;
  cMailId: string;
  cContactInfo: number;
  cPassword?: string;
  cAddress: string;
  cUsername: string;
  vehicleModelYear: string;
  purchaseDate: string;
  loyaltyPoints: number;
  addedByDealer: string;
}

// 2. Your existing interface for the HTML table
export interface customerData {
  sl_no: number;
  customer_name: string;
  customer_id: string;
  purchase_date: string;
  loyalty_points: number;
  offers_eligible: string;
}

// 3. Represents the data sent when adding a new customer
export interface AddCustomerPayload {
  c_first_name: string;
  c_middle_name: string;
  c_last_name: string;
  c_username: string;
  c_password: string;
  c_mail_id: string;
  c_contact_info: number;
  c_address: string;
  vehicle_model_year: string;
  price: number;
  purchase_date: string;
}

// 4. Represents the success response after adding a customer
export interface AddCustomerResponse {
  message: string;
  customerId?: string;
}