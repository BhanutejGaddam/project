
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type VehicleStock = {
  modelNo: number;
  modelName: string;
  unitPriceINR: number;
  units: number;
};

type SparePart = {
  partID: number;
  partName: string;
  costINR: number;
};

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css'] // optional; we’ll use inline style too
})
export class ViewInventoryComponent {

  // The dealer to show (from query param ?id=101)
  dealerID: number | null = null;
  dealerName = '';

  // --- Demo data maps (keyed by dealerID) ---
  private vehiclesByDealer: Record<number, VehicleStock[]> = {
    101: [
      { modelNo: 1001, modelName: 'Sedan X',     unitPriceINR: 1500000, units: 15 },
      { modelNo: 1003, modelName: 'Hatchback Z', unitPriceINR:  850000, units: 12 },
    ],
    102: [
      { modelNo: 1002, modelName: 'SUV Y',       unitPriceINR: 1200000, units: 12 },
      { modelNo: 1006, modelName: 'Crossover C', unitPriceINR: 1000000, units:  8 },
    ],
    103: [
      { modelNo: 1004, modelName: 'Coupe A',     unitPriceINR: 1300000, units: 3 },
      { modelNo: 1007, modelName: 'Mini M',      unitPriceINR:  210000, units: 4 },
    ],
    104: [
      { modelNo: 1005, modelName: 'Truck B',     unitPriceINR: 1050000, units: 4 },
      { modelNo: 1008, modelName: 'Van V',       unitPriceINR:  250000, units: 5 },
    ],
  };

  private sparePartsByDealer: Record<number, SparePart[]> = {
    101: [
      { partID: 501, partName: 'Brake Pad Set',    costINR: 2500 },
      { partID: 502, partName: 'Air Filter',       costINR:  900 },
      { partID: 503, partName: 'Engine Oil (L)',   costINR:  750 },
    ],
    102: [
      { partID: 511, partName: 'Headlamp Assembly', costINR: 3200 },
      { partID: 512, partName: 'Wiper Blades',      costINR:  450 },
    ],
    103: [
      { partID: 521, partName: 'Clutch Plate',      costINR: 4100 },
      { partID: 522, partName: 'Coolant (L)',       costINR:  600 },
    ],
    104: [
      { partID: 531, partName: 'Truck Tyre',        costINR: 8200 },
      { partID: 532, partName: 'Tail Light',        costINR: 1500 },
    ],
  };

  // You can replace this with a real lookup service later
  private dealerNames: Record<number, string> = {
    101: 'Dealer One',
    102: 'Dealer Two',
    103: 'Dealer Three',
    104: 'Dealer Four'
  };

  constructor(private route: ActivatedRoute) {
    // Read dealerID from query params: /admin/viewinventory?id=101
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.dealerID = id ? +id : null;
      this.dealerName = this.dealerID ? (this.dealerNames[this.dealerID] ?? `Dealer ${this.dealerID}`) : '';
    });
  }

  // Data getters used by template
  get vehicles(): VehicleStock[] {
    return this.dealerID ? (this.vehiclesByDealer[this.dealerID] ?? []) : [];
  }
  get parts(): SparePart[] {
    return this.dealerID ? (this.sparePartsByDealer[this.dealerID] ?? []) : [];
  }

  // Totals for vehicles table
  get totalUnits(): number {
    return this.vehicles.reduce((sum, r) => sum + (r?.units ?? 0), 0);
  }
  get totalValueINR(): number {
    return this.vehicles.reduce((sum, r) => sum + ((r?.unitPriceINR ?? 0) * (r?.units ?? 0)), 0);
  }
}
