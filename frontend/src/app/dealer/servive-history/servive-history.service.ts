import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { RawServiceBooking } from "./service.interface";

@Injectable({providedIn:'root'})
export class SericeHistoryService{
    private http = inject(HttpClient);
    private serviceHistoryapi='https://localhost:7169/api/ServiceHistory/customer';

    // Inside CustomerService
    getServiceHistory(customerId: string): Observable<RawServiceBooking[]> {
        return this.http.get<RawServiceBooking[]>(`${this.serviceHistoryapi}/${customerId}`);
    }

}