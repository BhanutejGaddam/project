import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class SericeHistoryService{
    private http = inject(HttpClient);
    private serviceHistoryapi='https://localhost:7169/api/ServiceHistory/customer';

    // Inside CustomerService
    getServiceHistory(customerId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.serviceHistoryapi}/${customerId}`);
    }

}