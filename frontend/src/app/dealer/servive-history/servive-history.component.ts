import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SericeHistoryService } from './servive-history.service';
import {serviceHistory} from './service.interface';
import {CurrencyPipe} from '@angular/common'

@Component({
  selector: 'app-servive-history',
  standalone:true,
  imports: [CurrencyPipe],
  templateUrl: './servive-history.component.html',
  styleUrl: './servive-history.component.css'
})
export class ServiveHistoryComponent implements OnInit {
  vehicleId!: string | null;
  private route=inject(ActivatedRoute);
  private serivces=inject(SericeHistoryService);
  history: serviceHistory[]=[];
  ngOnInit(): void {
    this.vehicleId=this.route.snapshot.paramMap.get('id');
    if(this.vehicleId){
      this.history=this.serivces.getServiceHistoryByVehicleId(this.vehicleId);
    }
  }
}
