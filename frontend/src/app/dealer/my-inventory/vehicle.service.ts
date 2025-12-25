// src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';
import { BehaviorSubject } from 'rxjs';

// // src/app/services/vehicle.service.ts
// import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      vehicleID: 1,
      model: 'Sedan X',
      price: 1500000,
      noOfVehiclesAvailable: 15,   // ✅ updated
    },
    {
      vehicleID: 2,
      model: 'SUV Y',
      price: 1200000,
      noOfVehiclesAvailable: 12,   // ✅ updated
    },
    {
      vehicleID: 3,
      model: 'Hatchback Z',
      price: 1800000,
      noOfVehiclesAvailable: 18,   // ✅ updated
    },
  ];

  private vehicleSubject = new BehaviorSubject<Vehicle[]>(this.vehicles);
  vehicles$ = this.vehicleSubject.asObservable();

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.vehicleSubject.next(this.vehicles);
  }

  updateVehicle(updated: Vehicle) {
    const index = this.vehicles.findIndex(
      (v) => v.vehicleID === updated.vehicleID
    );
    if (index !== -1) {
      this.vehicles[index] = updated;
      this.vehicleSubject.next(this.vehicles);
    }
  }

  deleteVehicle(id: number) {
    this.vehicles = this.vehicles.filter((v) => v.vehicleID !== id);
    this.vehicleSubject.next(this.vehicles);
  }
}
