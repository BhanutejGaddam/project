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
        next: (data: any[]) => {
          // Map the raw backend data to the format your HTML table expects
          this.serviceHistory = data.map((item, index) => ({
            slno: index + 1,
            date: item.slot,
            warrantyavailed: item.availed_Warranty ? 'Yes' : 'No',
            // Correctly calls the helper function to filter checked services
            warrantyServices: this.getWarrantyList(item),
            Repairs: item.typeOfService === 'repair' ? 'Specific Repair' : '—',
            routineMaintanance: item.typeOfService === 'routine' ? 'Yes' : 'No',
            // Maps the database total_bill (converted to totalBill by .NET)
            amountPaid: item.totalBill || 0 
          }));
        },
        error: (err) => {
          console.error('History fetch failed', err);
        }
      });
    }
  }

  /**
   * Helper to convert boolean database columns into a readable list of strings
   */
  private getWarrantyList(item: any): string[] {
    const services: string[] = [];
    
    // Note: Use exact property names from your .NET Model/SQL columns
    if (item.engine_Check) services.push('Engine');
    if (item.brake_Inspection) services.push('Brakes');
    if (item.oil_Change) services.push('Oil');
    if (item.transmission_Service) services.push('Transmission');
    if (item.battery_Replacement) services.push('Battery');
    if (item.tire_Rotation) services.push('Tires');
    if (item.suspension_Check) services.push('Suspension');
    if (item.electrical_System) services.push('Electrical');
    if (item.cooling_System) services.push('Cooling');
    if (item.exhaust_System) services.push('Exhaust');
    
    return services;
  }
}