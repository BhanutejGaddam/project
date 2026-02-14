import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for forms
import { VehicleService } from './vehicle.service'; // Use the new service
import { VehicleInventory, SparePartInventory } from './vehicle.model';

@Component({
  selector: 'app-my-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.css'],
})
export class MyInventoryComponent implements OnInit {
  private vehicleService = inject(VehicleService);

  vehicles: VehicleInventory[] = [];
  parts: SparePartInventory[] = [];
  
  // Form Visibility Toggles
  showVehicleForm = false;
  showPartForm = false;

  // Form Models
  newVehicle: VehicleInventory = { vehicleId: '', modelInfo: '', price: 0, isAvailable: true, availableUnits: 0 };
  newPart: SparePartInventory = { sparePartId: '', sparePartName: '', sparePartPrice: 0, isAvailable: true, availableUnits: 0 };

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.vehicleService.getMyInventory().subscribe({
      next: (data) => {
        this.vehicles = data.vehicles;
        this.parts = data.spareParts;
      },
      error: (err) => console.error('Failed to load inventory', err)
    });
  }

  onAddVehicle(): void {
    this.vehicleService.addVehicle(this.newVehicle).subscribe({
      next: () => {
        this.loadInventory(); // Refresh list
        this.showVehicleForm = false; // Hide form
        this.resetVehicleForm();
      },
      error: (err) => alert('Error adding vehicle: ' + err.message)
    });
  }

  onAddSparePart(): void {
    this.vehicleService.addSparePart(this.newPart).subscribe({
      next: () => {
        this.loadInventory();
        this.showPartForm = false;
        this.resetPartForm();
      },
      error: (err) => alert('Error adding spare part: ' + err.message)
    });
  }

  resetVehicleForm() {
    this.newVehicle = { vehicleId: '', modelInfo: '', price: 0, isAvailable: true, availableUnits: 0 };
  }

  resetPartForm() {
    this.newPart = { sparePartId: '', sparePartName: '', sparePartPrice: 0, isAvailable: true, availableUnits: 0 };
  }

  // Totals calculations
  get totalUnits(): number {
    return this.vehicles.reduce((sum, v) => sum + (v.availableUnits || 0), 0);
  }

  get totalValueINR(): number {
    return this.vehicles.reduce((sum, v) => sum + (v.price * (v.availableUnits || 0)), 0);
  }
}