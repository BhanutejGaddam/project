import { Component, NgModule } from '@angular/core';
import { bookingDataList, BookingData } from '../../bookingData';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-book-service',
  imports: [NgIf, FormsModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})


export class BookServiceComponent {
  booking: BookingData = {
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    makeModelYear: '',
    vin: '',
    registration: '',
    mileage: 0,
    fuelType: 'petrol',
    serviceType: 'routine',
    issues: '',
    package: 'basic',
    history: '',
    serviceDate: '',
    pickupDrop: 'none',
    emergencyContact: '',
    warranty: 'no',
    warrantyServices: [],
    serviceStatus:'BOOKED'
  };

  message: string = '';

  onSubmit() {
    // check if serviceDate already exists
    const exists = bookingDataList.some(
      b => b.serviceDate === this.booking.serviceDate
    );

    if (exists) {
      this.message = 'Choose different time slot';
    } else {
      bookingDataList.push({ ...this.booking });
      this.message = 'Service booked successfully!';
    }
  }
}
