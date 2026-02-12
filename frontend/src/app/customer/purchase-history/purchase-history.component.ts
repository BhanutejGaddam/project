import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthenticationService } from '../../login/authentication.service';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit {
  private authService = inject(AuthenticationService);
  serviceHistory: any[] = [];

  ngOnInit() {
    const customerId = this.authService.getLoggedInUserId();
    if (customerId) {
      this.authService.getServiceHistory$(customerId).subscribe({
        next: (data) => {
          this.serviceHistory = data.map((item, index) => ({
            slno: index + 1,
            date: item.slot,
            warrantyavailed: item.availed_Warranty ? 'Yes' : 'No',
            // Create a list of warranty services that were checked (true)
            warrantyServices: this.getWarrantyList(item),
            Repairs: item.typeOfService === 'repair' ? 'Specific Repair' : '—',
            routineMaintanance: item.typeOfService === 'routine' ? 'Yes' : 'No',
            amountPaid: 0 // You can update this once you add a 'Price' column to SQL
          }));
        },
        error: (err) => console.error('History fetch failed', err)
      });
    }
  }

  // Helper to convert boolean columns into a readable string array
  private getWarrantyList(item: any): string[] {
    const services = [];
    if (item.engine_Check) services.push('Engine');
    if (item.brake_Inspection) services.push('Brakes');
    if (item.oil_Change) services.push('Oil');
    if (item.transmission_Service) services.push('Transmission');
    if (item.battery_Replacement) services.push('Battery');
    // Add others as needed
    return services;
  }
}