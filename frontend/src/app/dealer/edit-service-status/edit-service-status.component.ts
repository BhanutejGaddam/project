import { Component, inject,OnInit } from '@angular/core';
import {ServiceStatusServices} from '../service-status/service-status.services';
import { ActivatedRoute,Router } from '@angular/router';
import { BookingData } from '../../bookingData';
import { FormsModule,NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-service-status',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-service-status.component.html',
  styleUrl: './edit-service-status.component.css'
})
export class EditServiceStatusComponent implements OnInit {
  private statusServices=inject(ServiceStatusServices);
  private route=inject(ActivatedRoute);
  private router=inject(Router);
  serviceId:string|null='';
  customerBooking:BookingData | undefined;

  ngOnInit(): void {
    // 1. Get serviceId from Query Params
    this.route.queryParams.subscribe(params => {
      this.serviceId = params['serviceId'];
      
      if (this.serviceId) {
        // 2. Try to find the booking in the loaded signal
        this.customerBooking = this.statusServices.getBookingFromSignal(this.serviceId);
        
        // Fallback: If user refreshed the page and signal is gone, go back
        if (!this.customerBooking) {
          console.warn('Signal was empty, redirecting to dashboard...');
          this.router.navigate(['/dealer/dashboard']);
        }
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.serviceId) {
      const selectedStatus = form.value.status as BookingData['serviceStatus'];

      this.statusServices.updateBookingStatus(this.serviceId, selectedStatus).subscribe({
        next: (res) => {
          alert(res.message);
          this.goBack();
        },
        error: (err) => {
          console.error(err);
          alert('Update failed. Check if the backend is running.');
        }
      });
    }
  }

  goBack(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }  
}