import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SericeHistoryService } from './servive-history.service';
import {ServiceHistory,CustomerServiceRecord, RawServiceBooking} from './service.interface';
import {CurrencyPipe} from '@angular/common'

@Component({
  selector: 'app-servive-history',
  standalone:true,
  imports: [CurrencyPipe],
  templateUrl: './servive-history.component.html',
  styleUrl: './servive-history.component.css'
})
export class ServiveHistoryComponent implements OnInit {
  constructor(
    private customerService: SericeHistoryService,
    private route: ActivatedRoute,
    private router: Router
  ){}
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

  // servive-history.component.ts

loadServiceData(customerId: string) {
  this.customerService.getServiceHistory(customerId).subscribe({
    next: (bookings: RawServiceBooking[]) => { // Using explicit type here
      if (bookings.length > 0) {
        const first = bookings[0];
        
        const transformedHistory: ServiceHistory[] = bookings.map((b) => {
          const services: string[] = [];
          if (b.engine_Check) services.push('Engine Check');
          if (b.oil_Change) services.push('Oil Change');
          if (b.brake_Inspection) services.push('Brake Inspection');
          if (b.tire_Rotation) services.push('Tire Rotation');
          // Add others if needed (b.transmission_Service, etc.)

          return {
            bookingId: b.bookingId,
            date: new Date(b.slot).toLocaleDateString('en-GB'),
            status: b.bookingStatus,
            typeOfService: b.typeOfService, // Corrected from type_of_Service
            warrantyAvailed: b.availed_Warranty ? 'Yes' : 'No',
            warrantyServices: services,
            repairs: b.typeOfService.toLowerCase().includes('repair') ? 'Yes' : 'No',
            routineMaintenance: b.typeOfService.toLowerCase().includes('routine') ? 'Yes' : 'No',
            totalBill: b.totalBill ?? 0 
          };
        });

        this.record.set({
          customerName: first.fullName, // Corrected from full_Name
          customerId: first.customerId, // Corrected from customer_id
          vehicleId: first.registrationNumber || 'N/A', // Corrected from registration_Number
          history: transformedHistory
        });
      }
    },
    error: (err) => console.error('History Error:', err)
  });
}
}
