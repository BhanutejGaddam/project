import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  // Replace with your actual .NET Port
  private apiUrl = 'https://localhost:7169/api/AddDealer'; 

  constructor(private http: HttpClient) { }

  // GET all dealers from SQL
  getDealers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST new dealer to SQL
  addDealer(dealerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, dealerData);
  }
}