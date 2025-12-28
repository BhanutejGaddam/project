import { Injectable, signal,computed } from '@angular/core';
import {customerInfo} from './customers.data';
import { customerData } from './customer.interface';

@Injectable({providedIn:'root'})
export class CustomerService{

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
}