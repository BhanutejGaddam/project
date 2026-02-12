import { Injectable, signal,computed, inject } from '@angular/core';
import {customerInfo} from './customers.data';
import { customerData } from './customer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class CustomerService{
    private apiUrl = 'https://localhost:7169/api/AddCustomer/register'; // Replace with your actual API endpoint
    private http = inject(HttpClient);
    customers=signal<customerData[]>(customerInfo);
    entered_text=signal<string>('');

    public readonly search_result=computed<customerData[]>(() => {
        const term=this.entered_text().trim().toLowerCase();
        const list=this.customers();
        if(!term){
            return list;
        }
        return list.filter(c =>
            c.customer_name.toLowerCase().includes(term)
        );
    });

    updateSearch(entered_value:string){
        return this.entered_text.set(entered_value); 
    }

    getData(){
        return customerInfo;
    }

    addCustomer(customerData: any): Observable<any> {
    return this.http.post(this.apiUrl, customerData);
  }
}