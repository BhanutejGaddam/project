
import { Component } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';

@Component({
  selector: 'app-my-inventory',
  imports: [],
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.css'],
})
export class MyInventoryComponent {
   
  openAddVehicle(_t14: any) {
    throw new Error('Method not implemented.');
  }
  deleteDealer(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editDealer(_t14: any) {
    throw new Error('Method not implemented.');
  }
  dealers: any;
  addDealer() {
    throw new Error('Method not implemented.');
  }
  refresh() {
    throw new Error('Method not implemented.');
  }
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.vehicles$.subscribe((data) => (this.vehicles = data));
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id);
  }

  getDealerTotal(dealer: {
    vehicles?: { noOfVehiclesAvailable?: number }[];
  }): number {
    return (dealer?.vehicles ?? []).reduce(
      (sum, v) => sum + (v?.noOfVehiclesAvailable ?? 0),
      0
    );
  }

  getDealerValueINR(dealer: {
    vehicles?: { price?: number; noOfVehiclesAvailable?: number }[];
  }): number {
    return (dealer?.vehicles ?? []).reduce(
      (sum, v) => sum + (v?.price ?? 0) * (v?.noOfVehiclesAvailable ?? 0),
      0
    );
  }

  getOverallTotal(): number {
    return (this.dealers ?? [])
      .flatMap((d: { vehicles: any }) => d?.vehicles ?? [])
      .reduce(
        (sum: any, v: { noOfVehiclesAvailable: any }) =>
          sum + (v?.noOfVehiclesAvailable ?? 0),
        0
      );
  }

  getOverallValueINR(): number {
    return (this.dealers ?? [])
      .flatMap((d: { vehicles: any }) => d?.vehicles ?? [])
      .reduce(
        (sum: number, v: { price: any; noOfVehiclesAvailable: any }) =>
          sum + (v?.price ?? 0) * (v?.noOfVehiclesAvailable ?? 0),
        0
      );
  }

  getMyTotalUnits(): number {
    return (this.vehicles ?? []).reduce(
      (sum, v) => sum + (v?.noOfVehiclesAvailable ?? 0),
      0
    );
  }

  getMyTotalValueINR(): number {
    return (this.vehicles ?? []).reduce(
      (sum, v) => sum + (v?.price ?? 0) * (v?.noOfVehiclesAvailable ?? 0),
      0
    );
  }
}
