import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingData } from '../../bookingData';
import { ServiceStatusServices } from './service-status.services';
import { RouterModule } from "@angular/router";
import { Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.css'
  ],
  imports: [RouterModule,CommonModule]
})
export class ServiceStatusComponent implements OnInit {
  // 1. Remove this line as it's not being used and causes confusion:
  // serviceData: BookingData[] = []; 

  private statusServices = inject(ServiceStatusServices);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // 2. This is your "Source of Truth" for the template
  todayBookings = signal<BookingData[]>([]);

  ngOnInit(): void {
    this.loadTodaySchedule();
  }

  loadTodaySchedule(): void {
    this.statusServices.getTodayBookings().subscribe({
      next: (data: BookingData[]) => {
        // 3. This correctly updates the Signal
        this.todayBookings.set(data);
      },
      error: (err: Error) => {
        console.error('Data retrieval failed:', err.message);
      }
    });
  }

  goToEdit(serviceId: string) {
    this.router.navigate(['./edit'], {
      queryParams: { serviceId: serviceId },
      relativeTo: this.route
    });
  }
}
