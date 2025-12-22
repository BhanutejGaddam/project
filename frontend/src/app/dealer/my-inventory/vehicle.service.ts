// src/app/services/vehicle.service.ts
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
      price: 25000,
      availabilityStatus: 'Available',
      dealerID: 101,
    },
    {
      vehicleID: 2,
      model: 'SUV Y',
      price: 40000,
      availabilityStatus: 'Sold',
      dealerID: 102,
    },
    {
      vehicleID: 3,
      model: 'Hatchback Z',
      price: 18000,
      availabilityStatus: 'Available',
      dealerID: 101,
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
