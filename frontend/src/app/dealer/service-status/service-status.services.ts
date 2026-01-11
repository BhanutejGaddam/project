import { Injectable } from "@angular/core";
import { bookingDataList, BookingData } from '../../bookingData';

@Injectable({providedIn:'root'})
export class ServiceStatusServices{
    data: BookingData[] = [];
    currentBookings:BookingData[]=[];
    retrievedData:BookingData[]=[];
    customerBookings:BookingData|undefined;
  getServiceData(){
    const stored = localStorage.getItem('bookings');
    if (stored) {
      try {
        this.data = JSON.parse(stored) as BookingData[];
      } catch (e) {
        console.error('Failed to parse bookings from localStorage', e);
      }
    }
    // console.log(this.data);
    return this.data;
  }

  getTodayBookings(){
    this.retrievedData=this.getServiceData();
    this.currentBookings=[];
    for(let booking of this.retrievedData){
        // console.log(booking.serviceDate);
        let dateOnly=booking.serviceDate.split('T')[0];
        const today=new Date();
        const todayOnly=String(today.toISOString().split('T')[0]);
        if(dateOnly===todayOnly){
          this.currentBookings.push(booking)
        }
    }
    return this.currentBookings;
  }
  getWithServiceId(serviceId:string){
    this.retrievedData=this.getServiceData();
    this.customerBookings=this.retrievedData.find(booking=>booking.serviceId===serviceId);
    return this.customerBookings;
  }
  editServiceStatus(serviceId:string,updatedStatus:BookingData['serviceStatus']){
     this.retrievedData=this.getServiceData();
     for(let booking of this.retrievedData){
      if(booking.serviceId===serviceId){
        booking.serviceStatus=updatedStatus;
        console.log('Service status updated');
      }
     }
     localStorage.setItem('bookings',JSON.stringify(this.retrievedData));
     console.log("Updated status stored");
  }
  
}