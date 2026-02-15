import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesReport, RevenueTrend } from '../models/sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  private readonly SalesapiUrl = 'https://localhost:7169/api/Analytics/sales-report'; 
  private readonly RevenueapiUrl = 'https://localhost:7169/api/Analytics/revenue-trends';
  

  private http = inject(HttpClient);

  
  getSalesReport(dealerId?: string | number): Observable<SalesReport> {
    
    const id = dealerId ?? 'current'; 
    return this.http.get<SalesReport>(`${this.SalesapiUrl}/${id}`);
  }

 
  getRevenueTrends(dealerId?: string | number): Observable<RevenueTrend> {
    const id = dealerId ?? 'current';
    return this.http.get<RevenueTrend>(`${this.RevenueapiUrl}/${id}`);
  }
}