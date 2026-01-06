
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Vehicle = {
  vehicleID: number;
  model: string;
  price: number;                
  noOfVehiclesAvailable: number;
};

type Dealer = {
  dealerID: number;
  dealerName: string;
  vehicles: Vehicle[];
};

@Component({
  selector: 'app-dealer-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dealer-inventory.component.html',
  styleUrls: ['./dealer-inventory.component.css']
})
export class DealerInventoryComponent {

  dealers: Dealer[] = [
    {
      dealerID: 101,
      dealerName: 'Dealer One',
      vehicles: [
        { vehicleID: 1001, model: 'Sedan X',     price: 1500000, noOfVehiclesAvailable: 15 },
        { vehicleID: 1003, model: 'Hatchback Z', price:  850000, noOfVehiclesAvailable: 12 }
      ]
    },
    {
      dealerID: 102,
      dealerName: 'Dealer Two',
      vehicles: [
        { vehicleID: 1002, model: 'SUV Y',       price: 1200000, noOfVehiclesAvailable: 12 },
        { vehicleID: 1006, model: 'Crossover C', price: 1000000, noOfVehiclesAvailable:  8 }
      ]
    },
    {
      dealerID: 103,
      dealerName: 'Dealer Three',
      vehicles: [
        { vehicleID: 1004, model: 'Coupe A',     price: 1300000, noOfVehiclesAvailable: 3 },
        { vehicleID: 1007, model: 'Mini M',      price:  210000, noOfVehiclesAvailable: 4 }
      ]
    },
    {
      dealerID: 104,
      dealerName: 'Dealer Four',
      vehicles: [
        { vehicleID: 1005, model: 'Truck B',     price: 1050000, noOfVehiclesAvailable: 4 },
        { vehicleID: 1008, model: 'Van V',       price:  250000, noOfVehiclesAvailable: 5 }
      ]
    }
  ];

  getDealerTotalUnits(dealer: Dealer): number {
    return (dealer?.vehicles ?? [])
      .reduce((sum, v) => sum + (v?.noOfVehiclesAvailable ?? 0), 0);
  }

  getDealerTotalValueINR(dealer: Dealer): number {
    return (dealer?.vehicles ?? [])
      .reduce((sum, v) => sum + ((v?.price ?? 0) * (v?.noOfVehiclesAvailable ?? 0)), 0);
  }

  getOverallTotalUnits(): number {
    return (this.dealers ?? [])
      .flatMap(d => d?.vehicles ?? [])
      .reduce((sum, v) => sum + (v?.noOfVehiclesAvailable ?? 0), 0);
  }

  getOverallTotalValueINR(): number {
    return (this.dealers ?? [])
      .flatMap(d => d?.vehicles ?? [])
      .reduce((sum, v) => sum + ((v?.price ?? 0) * (v?.noOfVehiclesAvailable ?? 0)), 0);
  }

  refresh(): void {
    this.dealers = [...this.dealers]; 
  }
  // refresh(): Reassigns a new array copy [...] to this.dealers

  addDealer(): void {
    const nextId = (this.dealers.length ? Math.max(...this.dealers.map(d => d.dealerID)) : 100) + 1;
    this.dealers.push({ dealerID: nextId, dealerName: `Dealer ${nextId}`, vehicles: [] });
    this.dealers = [...this.dealers];
  }
  
}
