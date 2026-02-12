import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Warranty } from '../Models/warranty.model';

@Injectable({ providedIn: 'root' })
export class WarrantyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7169/api/Dealer/warranties'; // Use your actual port

  list(): Observable<Warranty[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map((item, index) => ({
        warrantyId: index + 1,
        vehicleId: item.vehicleNumber,
        status: item.status as any,
        issuedDate: item.issuedDate,
        expiryDate: item.expiryDate
      })))
    );
  }

  getById(vehicleNo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${vehicleNo}`);
  }

  create(warranty: any): Observable<any> {
    const payload = {
      vehicleNumber: warranty.vehicleId,
      status: warranty.status,
      issuedDate: warranty.issuedDate,
      expiryDate: warranty.expiryDate
    };
    return this.http.post(this.apiUrl, payload);
  }

  update(vehicleNo: string, warranty: any): Observable<any> {
    const payload = {
      vehicleNumber: vehicleNo,
      status: warranty.status,
      issuedDate: warranty.issuedDate,
      expiryDate: warranty.expiryDate
    };
    return this.http.put(`${this.apiUrl}/${vehicleNo}`, payload);
  }

 delete(vehicleId: string): Observable<any> {
  // Use encodeURIComponent to handle vehicle numbers with spaces or dashes
  const encodedId = encodeURIComponent(vehicleId);
  return this.http.delete(`${this.apiUrl}/${encodedId}`);
}
}