import { Injectable } from "@angular/core";
import {servicesData} from './service.data';

@Injectable({providedIn:'root'})
export class SericeHistoryService{
    
    getServiceHistoryByVehicleId(vehicleId: string) {
        const customer = servicesData.find(item => item.vehicleId === vehicleId);
        return customer ? customer.serviceHistory : [];
    }

}