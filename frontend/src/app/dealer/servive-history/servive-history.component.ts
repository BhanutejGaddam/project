import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SericeHistoryService } from './servive-history.service';
import {ServiceHistory,CustomerServiceRecord} from './service.interface';
import {CurrencyPipe} from '@angular/common'

@Component({
  selector: 'app-servive-history',
  standalone:true,
  imports: [CurrencyPipe],
  templateUrl: './servive-history.component.html',
  styleUrl: './servive-history.component.css'
})
export class ServiveHistoryComponent implements OnInit {
  private route=inject(ActivatedRoute);
  private router=inject(Router);
  private customerService=inject(SericeHistoryService);
  record = signal<CustomerServiceRecord | null>(null);
  history: ServiceHistory[]=[];

  goToCustomers(){
    this.router.navigate(['../../'],{relativeTo:this.route});
  }
 

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadServiceData(id);
    }
  }

  loadServiceData(customerId: string) {
    this.customerService.getServiceHistory(customerId).subscribe({
      next: (bookings: any[]) => {
        if (bookings.length > 0) {
          const first = bookings[0];
          
          const transformedHistory: ServiceHistory[] = bookings.map((b, index) => {
            // Logic to collect all 'true' service flags into one array
            const services: string[] = [];
            if (b.engine_Check) services.push('Engine Check');
            if (b.oil_Change) services.push('Oil Change');
            if (b.brake_Inspection) services.push('Brake Inspection');
            if (b.tire_Rotation) services.push('Tire Rotation');

            return {
              bookingId: b.bookingId,
              date: new Date(b.slot).toLocaleDateString('en-GB'),
              status: b.bookingStatus,
              typeOfService: b.type_of_Service,
              warrantyAvailed: b.availed_Warranty ? 'Yes' : 'No',
              warrantyServices: services,
              repairs: b.type_of_Service === 'Repair' ? 'Yes' : 'No',
              routineMaintenance: b.type_of_Service === 'Maintenance' ? 'Yes' : 'No',
              totalBill: b.total_Bill ?? 0 // Map the new column here
            };
          });

          this.record.set({
            customerName: first.full_Name,
            customerId: first.customer_id,
            vehicleId: first.registration_Number || 'N/A',
            history: transformedHistory
          });
        }
      },
      error: (err) => console.error('History Error:', err)
    });
  }
}
