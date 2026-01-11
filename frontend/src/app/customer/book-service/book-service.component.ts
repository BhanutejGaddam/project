import { Component, NgModule } from '@angular/core';
import { bookingDataList, BookingData } from '../../bookingData';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-book-service',
  imports: [NgIf, FormsModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})


export class BookServiceComponent {
  warranty:'yes' | 'no' | null=null;
  //serviceId:string='';
  // booking: BookingData = {
  //   ownerName: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   makeModelYear: '',
  //   vin: '',
  //   registration: '',
  //   mileage: 0,
  //   fuelType: 'petrol',
  //   serviceType: 'routine',
  //   issues: '',
  //   package: 'basic',
  //   history: '',
  //   serviceDate: '',
  //   pickupDrop: 'none',
  //   emergencyContact: '',
  //   warranty: 'no',
  //   warrantyServices: [],
  //   serviceStatus:'BOOKED'
  // };

  message: string = '';
    
warrantyServiceOptions = [
    { key: 'engine',       label: 'Engine Check' },
    { key: 'brake',        label: 'Brake Inspection' },
    { key: 'oil',          label: 'Oil Change' },
    { key: 'transmission', label: 'Transmission Service' },
    { key: 'battery',      label: 'Battery Replacement' },
    { key: 'tire',         label: 'Tire Rotation' },
    { key: 'suspension',   label: 'Suspension Check' },
    { key: 'electrical',   label: 'Electrical System' },
    { key: 'cooling',      label: 'Cooling System' },
    { key: 'exhaust',      label: 'Exhaust System' },
  ];
   
  warrantyServices: Record<string, boolean> = Object.fromEntries(
    this.warrantyServiceOptions.map(s => [s.key, false])
  );

  // onSubmit() {
  //   // check if serviceDate already exists
  //   const exists = bookingDataList.some(
  //     b => b.serviceDate === this.booking.serviceDate
  //   );

  //   if (exists) {
  //     this.message = 'Choose different time slot';
  //   } else {
  //     bookingDataList.push({ ...this.booking });
  //     this.message = 'Service booked successfully!';
  //   }
  // }
  
// Utility safe parse
 safeParse<T>(s: string | null, fallback: T): T {
  try { return s ? JSON.parse(s) as T : fallback; } catch { return fallback; }
}

  onSubmit(serviceForm:NgForm){
    const serviceId=Math.random().toString(36).substring(2,7);
    const selectedWarranty = this.warrantyServiceOptions
      .filter(s => this.warrantyServices[s.key])
      .map(s => s.key);
    
    const payload:BookingData = {
      ...serviceForm.value,
      warrantySelections: selectedWarranty,
      serviceStatus:'BOOKED',
      serviceId:serviceId        
    };

    console.log('Submitting payload:', payload);
    const existing = this.safeParse<any[]>(localStorage.getItem('bookings'), []);
    existing.push(payload);
    localStorage.setItem("bookings", JSON.stringify(existing));
    this.message = 'Service booked successfully!';
  }
}