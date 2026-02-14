import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingData } from '../../bookingData';
import { ServiceStatusServices } from './service-status.services';
import { RouterModule } from "@angular/router";
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.css'
  ],
  imports: [RouterModule]
})
export class ServiceStatusComponent implements OnInit {
  serviceData: BookingData[] = [];
  private statusServices=inject(ServiceStatusServices);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  todayBookings = signal<BookingData[]>([]);
  ngOnInit(): void {
    this.loadTodaySchedule();
  }
  goToEdit(serviceId:string){
    this.router.navigate(['./edit'],{
      queryParams:{serviceId:serviceId},
      relativeTo:this.route
    })
  }

  loadTodaySchedule(): void {
    this.statusServices.getTodayBookings().subscribe({
      next: (data: BookingData[]) => {
        this.todayBookings.set(data);
      },
      error: (err: Error) => {
        console.error('Data retrieval failed:', err.message);
      }
    });
  }
}
