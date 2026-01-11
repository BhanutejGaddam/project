
import { Component } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';

@Component({
  selector: 'app-my-inventory',
  standalone: true,
  imports: [],
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.css'],
})
export class MyInventoryComponent {
   
  dealers: any;
  addDealer() {
    throw new Error('Method not implemented.');
  }
   vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.vehicles$.subscribe((data) => (this.vehicles = data));
    // DI
  }
}