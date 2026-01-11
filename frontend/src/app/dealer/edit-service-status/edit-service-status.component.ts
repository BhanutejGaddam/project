import { Component, inject,OnInit } from '@angular/core';
import {ServiceStatusServices} from '../service-status/service-status.services';
import { ActivatedRoute,Router } from '@angular/router';
import { BookingData } from '../../bookingData';
import { FormsModule,NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-service-status',
  imports: [FormsModule],
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
    this.serviceId=this.route.snapshot.queryParamMap.get('serviceId');
    if(this.serviceId){
       this.customerBooking=this.statusServices.getWithServiceId(this.serviceId);
    }

  }

  onSubmit(statusForm:NgForm){
    let newStatus=statusForm.value.status;
    console.log('Updated Status:', newStatus);
    if(this.serviceId) this.statusServices.editServiceStatus(this.serviceId,newStatus);
  }

  goBack(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }  
}