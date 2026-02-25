// dealer.interface.ts

// 1. Represents the data returned from your GET /api/Dealers endpoint
export interface Dealer {
  dealerId: string;
  dFirstName: string;
  dMiddleName?: string;
  dLastName?: string;
  dMailId: string;
  dContactInfo: number; // Note: Your API returns this as a number
  storeName: string;
  dPassword?: string; 
  storeAddress: string;
  city: string;
  state: string;
  dUsername: string;
}

// 2. Represents the payload sent to your POST /api/Dealers/add endpoint
export interface DealerPostDto {
  dealerId: string;
  dFirstName: string;
  dMiddleName: string;
  dLastName: string;
  dMailId: string;
  dPhone: string; // Note: Your code sends this as a string
  storeName: string;
  dPassword?: string;
  storeAddress: string;
  city: string;
  state: string;
  dUsername: string;
}

// 3. Represents the success response from the Add Dealer endpoint
export interface AddDealerResponse {
  message: string;
  id?: string;
}