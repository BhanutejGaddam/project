// customer.interface.ts

// 1. Represents the data you are sending to the API
export interface CustomerRegistrationPayload {
  customerId: string;
  cFirstName: string;
  cMiddleName?: string; 
  cLastName: string;
  cMailId: string;
  cContactInfo: number; 
  cPassword: string;
  cAddress: string;
  cUsername: string;
  // Add any other properties your C# CustomerInfo model expects, even if optional
}

// 2. Represents the success response from your C# AuthController
export interface RegisterResponse {
  message: string;
}