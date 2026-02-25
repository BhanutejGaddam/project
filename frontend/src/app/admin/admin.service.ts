import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RawVehicle,RawSparePart,RawInventoryResponse,VehicleStock,SparePart,InventoryResponse } from './view-inventory/view-inventory.interface';
import { Dealer, DealerPostDto, AddDealerResponse } from './dealers/dealer.interface';
@Injectable({
  providedIn: 'root'
})
export class DealerService {
  // Replace with your actual .NET Port
  private dealerUrl = 'https://localhost:7169/api/AddDealer'; 
  private inventoryUrl = 'https://localhost:7169/api/Inventory';

  constructor(private http: HttpClient) { }

  // GET all dealers from SQL
  getDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>(this.dealerUrl);
  }

  // POST new dealer to SQL
  addDealer(dealerData: DealerPostDto): Observable<AddDealerResponse> {
    return this.http.post<AddDealerResponse>(`${this.dealerUrl}/add`, dealerData);
  }

  getInventory(dealerId: string): Observable<InventoryResponse> {
  // We expect RawInventoryResponse from the GET call
  return this.http.get<RawInventoryResponse>(`${this.inventoryUrl}/${dealerId}`).pipe(
    map((response: RawInventoryResponse): InventoryResponse => {
      return {
        // Map RawVehicle -> VehicleStock
        vehicles: response.vehicles.map((v: RawVehicle): VehicleStock => ({
          modelNo: v.vehicleId, 
          modelName: v.modelInfo,
          unitPriceINR: v.price,
          units: v.availableUnits ?? 0 // Use the new column from SQL
        })),
        
        // Map RawSparePart -> SparePart
        spareParts: response.spareParts.map((p: RawSparePart): SparePart => ({
          partID: p.sparePartId, 
          partName: p.sparePartName,
          costINR: p.sparePartPrice,
          units: p.availableUnits ?? 0 // Use the new column from SQL
        }))
      };
    })
  );
}

}