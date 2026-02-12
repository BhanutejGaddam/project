import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../login/authentication.service'; // Adjust path if needed

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})

export class BookServiceComponent {
  // Injecting dependencies
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  warranty: 'yes' | 'no' | null = null;
  message: string = '';

  // Options for the UI checkboxes
  warrantyServiceOptions = [
    { key: 'engine', label: 'Engine Check' },
    { key: 'brake', label: 'Brake Inspection' },
    { key: 'oil', label: 'Oil Change' },
    { key: 'transmission', label: 'Transmission Service' },
    { key: 'battery', label: 'Battery Replacement' },
    { key: 'tire', label: 'Tire Rotation' },
    { key: 'suspension', label: 'Suspension Check' },
    { key: 'electrical', label: 'Electrical System' },
    { key: 'cooling', label: 'Cooling System' },
    { key: 'exhaust', label: 'Exhaust System' },
  ];

  // Object to track which checkboxes are checked
  warrantyServices: Record<string, boolean> = Object.fromEntries(
    this.warrantyServiceOptions.map(s => [s.key, false])
  );

  onSubmit(serviceForm: NgForm) {
    if (serviceForm.invalid) {
      window.alert('Please fill all required fields');
      return;
    }

    // 1. Get the real Customer ID from the logged-in session
    const loggedInId = this.authService.getLoggedInUserId();

    if (!loggedInId) {
      window.alert("Your session has expired. Please login again.");
      this.router.navigate(['/customer-login']);
      return;
    }

    const formValues = serviceForm.value;

    // 2. Extract year from "Make Model 2024" to match SQL smallint requirement
    const yearMatch = formValues.makeModelYear?.toString().match(/\d{4}/);
    const extractedYear = yearMatch ? parseInt(yearMatch[0]) : null;

    // 3. Construct the payload exactly as the .NET Model expects
    const payload = {
      customerId: loggedInId,
      fullName: formValues.ownerName,
      contactNumber: formValues.phone,
      emergencyContact: formValues.emergencyContact || null,
      emailAddress: formValues.email,
      address: formValues.address,
      vehicleModelYear: extractedYear,
      vinChassisNumber: formValues.vin,
      registrationNumber: formValues.registration,
      currentMileage: formValues.mileage ? Number(formValues.mileage) : 0,
      fuelType: formValues.fuelType,
      typeOfService: formValues.serviceType,
      descriptionOfIssues: formValues.issues,
      preferredServicePackage: formValues.package,
      previousServiceHistory: formValues.history,
      slot: formValues.serviceDate, // Ensure this is a valid ISO string or Date
      pickup_Dropoff: formValues.pickupDrop !== 'none',
      availed_Warranty: this.warranty === 'yes',

      // Checkbox Boolean Mapping
      engine_Check: !!this.warrantyServices['engine'],
      brake_Inspection: !!this.warrantyServices['brake'],
      oil_Change: !!this.warrantyServices['oil'],
      transmission_Service: !!this.warrantyServices['transmission'],
      battery_Replacement: !!this.warrantyServices['battery'],
      tire_Rotation: !!this.warrantyServices['tire'],
      suspension_Check: !!this.warrantyServices['suspension'],
      electrical_System: !!this.warrantyServices['electrical'],
      cooling_System: !!this.warrantyServices['cooling'],
      exhaust_System: !!this.warrantyServices['exhaust'],

      bookingStatus: 'BOOKED',
      createdAt: new Date().toISOString()
    };

    console.log('Sending Booking Payload:', payload);

    // 4. Send to Database via .NET API
    this.authService.bookService$(payload).subscribe({
      next: (response) => {
        window.alert('Booking successful! Your Service is scheduled.');
        serviceForm.resetForm();
        this.warranty = null; // Reset warranty toggle
        this.router.navigate(['/customer']); // Redirect to dashboard
      },
      error: (err) => {
        console.error('API Error:', err);
        window.alert('Database Connection Error. Please ensure the Backend is running.');
      }
    });
  }
}