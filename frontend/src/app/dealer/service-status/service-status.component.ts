import { Component, inject, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    // this.serviceData=this.statusServices.getServiceData();
    // console.log(this.serviceData);
    this.serviceData=this.statusServices.getTodayBookings();
    console.log(this.serviceData.values);

  }
  goToEdit(serviceId:string){
    this.router.navigate(['./edit'],{
      queryParams:{serviceId:serviceId},
      relativeTo:this.route
    })
  }
}
