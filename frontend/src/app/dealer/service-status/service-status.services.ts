import { inject,Injectable,signal } from "@angular/core";
import { BookingData,BackendBooking } from '../../bookingData';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class ServiceStatusServices{
    private http = inject(HttpClient);
  private serviceDataApiUrl = 'https://localhost:7169/api/DealerDashboard';
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

  // getTodayBookings(){
  //   this.retrievedData=this.getServiceData();
  //   this.currentBookings=[];
  //   for(let booking of this.retrievedData){
  //       // console.log(booking.serviceDate);
  //       let dateOnly=booking.serviceDate.split('T')[0];
  //       const today=new Date();
  //       const todayOnly=String(today.toISOString().split('T')[0]);
  //       if(dateOnly===todayOnly){
  //         this.currentBookings.push(booking)
  //       }
  //   }
  //   return this.currentBookings;
  // }
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
  
  getTodayBookings(): Observable<BookingData[]> {
    return this.http.get<BackendBooking[]>(`${this.serviceDataApiUrl}/today-bookings`).pipe(
      map((bookings: BackendBooking[]) => bookings.map(b => this.mapToBookingData(b)))
    );
  }

  private mapToBookingData(b: BackendBooking): BookingData {
    const selections: string[] = [];
    if (b.engine_Check) selections.push('Engine Check');
    if (b.oil_Change) selections.push('Oil Change');
    if (b.brake_Inspection) selections.push('Brake Inspection');
    if (b.tire_Rotation) selections.push('Tire Rotation');

    return {
      ownerName: b.fullName,
      phone: b.contactNumber,
      email: b.emailAddress ?? '',
      address: b.address ?? '',
      makeModelYear: b.vehicleModelYear ?? '',
      vin: b.vinChassisNumber ?? '',
      registration: b.registrationNumber ?? '',
      mileage: b.currentMileage ?? 0,
      fuelType: (b.fuelType?.toLowerCase() as BookingData['fuelType']) || 'petrol',
      serviceType: (b.typeOfService?.toLowerCase() as BookingData['serviceType']) || 'routine',
      issues: b.descriptionOfIssues ?? '',
      package: (b.preferredServicePackage?.toLowerCase() as BookingData['package']) || 'basic',
      history: b.previousServiceHistory ?? '',
      serviceDate: b.slot,
      pickupDrop: b.pickup_Dropoff ? 'both' : 'none',
      emergencyContact: b.emergencyContact,
      warranty: b.availed_Warranty ? 'yes' : 'no',
      warrantySelections: selections,
      serviceStatus: b.bookingStatus as BookingData['serviceStatus'],
      serviceId: b.bookingId.toString()
    };
  }

}