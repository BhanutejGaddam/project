// src/app/components/vehicle-inventory/vehicle-inventory.component.ts
import { Component } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-inventory',
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.css'],
})
export class MyInventoryComponent {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.vehicles$.subscribe((data) => (this.vehicles = data));
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id);
  }
}
