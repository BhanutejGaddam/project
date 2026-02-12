import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ComplianceRecord } from '../Models/compliance.model';

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7169/api/Dealer/compliance'; // Adjust your port

  list(): Observable<ComplianceRecord[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map((item, index) => this.mapToModel(item, index)))
    );
  }

  getById(vehicleNo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${vehicleNo}`);
  }

  create(record: any): Observable<any> {
    return this.http.post(this.apiUrl, this.mapToSql(record));
  }

  update(vehicleNo: string, record: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${vehicleNo}`, this.mapToSql(record));
  }

  delete(vehicleNo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${vehicleNo}`);
  }

  // Helper to match Frontend Model
  private mapToModel(item: any, index: number): ComplianceRecord {
    return {
      complianceId: index + 1,
      vehicleId: item.vehicleNumber,
      PollutionCheck: item.pollutionCheck,
      fitness: item.fitnessCheck,
      RC: item.rcCheck,
      checkDate: item.lastChecked,
      expiryDate: item.expiry
    };
  }

  // Helper to match SQL naming
  private mapToSql(record: any) {
    return {
      vehicleNumber: record.vehicleId,
      pollutionCheck: record.PollutionCheck,
      fitnessCheck: record.fitness,
      rcCheck: record.RC,
      lastChecked: record.checkDate,
      expiry: record.expiryDate
    };
  }

  // Add this method to your ComplianceService class
listByVehicle(vehicleId: string): Observable<ComplianceRecord[]> {
  return this.list().pipe(
    map(records => records.filter(r => 
      r.vehicleId.toLowerCase().includes(vehicleId.toLowerCase())
    ))
  );
}
}