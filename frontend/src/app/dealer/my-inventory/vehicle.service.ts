
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      vehicleID: 1,
      model: 'Sedan X',
      price: 1500000,
      noOfVehiclesAvailable: 15,   
    },
    {
      vehicleID: 2,
      model: 'SUV Y',
      price: 1200000,
      noOfVehiclesAvailable: 12,  
    },
    {
      vehicleID: 3,
      model: 'Hatchback Z',
      price: 1800000,
      noOfVehiclesAvailable: 18,  
    },
    {
      vehicleID: 4,
      model: 'Coupe A',
      price: 2000000,
      noOfVehiclesAvailable: 20,
    },
    {
      vehicleID: 5,
      model: 'Convertible B',
      price: 2500000,
      noOfVehiclesAvailable: 25,
    },
    {
      vehicleID: 6,
      model: 'Pickup C',
      price: 3000000,
      noOfVehiclesAvailable: 30,
    }
  ];

  private vehicleSubject = new BehaviorSubject<Vehicle[]>(this.vehicles);
  vehicles$ = this.vehicleSubject.asObservable();

}
