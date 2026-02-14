import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleInventory, SparePartInventory, InventoryResponse } from './vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7169/api/DealerInventory';

  // Helper to get the token from storage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Fetch all inventory for the logged-in dealer
   */
  getMyInventory(): Observable<InventoryResponse> {
    return this.http.get<InventoryResponse>(`${this.apiUrl}/my-inventory`, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Add a new vehicle to the inventory
   */
  addVehicle(vehicle: VehicleInventory): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-vehicle`, vehicle, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Add a new spare part to the inventory
   */
  addSparePart(part: SparePartInventory): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-spare-part`, part, {
      headers: this.getAuthHeaders()
    });
  }
}