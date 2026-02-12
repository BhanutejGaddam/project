import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleStock, SparePart, InventoryResponse } from './view-inventory.interface';
import { DealerService } from '../admin.service'; // Adjust path based on your folder structure

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {

  dealerID: string | null = null;
  dealerName = '';
  
  // These will now hold the data fetched from SQL Server
  vehicles: VehicleStock[] = [];
  parts: SparePart[] = [];

  constructor(
    private route: ActivatedRoute,
    private dealerService: DealerService
  ) {}

  ngOnInit(): void {
    // Subscribe to query parameters to get the Dealer ID
    this.route.queryParamMap.subscribe(params => {
      this.dealerID = params.get('id');
      
      if (this.dealerID) {
        this.fetchInventory(this.dealerID);
      }
    });
  }

  /**
   * Calls the .NET API via the DealerService to get combined inventory
   */
  fetchInventory(id: string): void {
    this.dealerService.getInventory(id).subscribe({
      next: (data: InventoryResponse) => {
        this.vehicles = data.vehicles;
        this.parts = data.spareParts;
        
        // Note: If you need to fetch the Dealer Name from the DB as well, 
        // you could call a getDealerById method here.
        this.dealerName = `Dealer ${id}`; 
      },
      error: (err) => {
        console.error('Error fetching inventory from SQL:', err);
      }
    });
  }

  // --- Computed Properties for the HTML Template ---

  get totalUnits(): number {
    return this.vehicles.reduce((sum, v) => sum + (v.units || 0), 0);
  }

  get totalValueINR(): number {
    return this.vehicles.reduce((sum, v) => sum + (v.unitPriceINR * (v.units || 0)), 0);
  }
}