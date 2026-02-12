import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthenticationService } from '../../login/authentication.service';

@Component({
  selector: 'app-service-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-service.component.html',
  styleUrls: ['./track-service.component.css'],
})
export class TrackServiceComponent implements OnInit {
  private authService = inject(AuthenticationService);
  
  // Signal to hold the data from the database
  bookingSig = signal<any | null>(null);

  readonly steps = [
    'BOOKED',
    'VEHICLE_RECEIVED',
    'SERVICE_IN_PROGRESS',
    'COMPLETED',
  ] as const;

  ngOnInit() {
    const customerId = this.authService.getLoggedInUserId();
    if (customerId) {
      this.authService.getBookingStatus$(customerId).subscribe({
        next: (data) => {
          // Mapping SQL structure to HTML template structure
          this.bookingSig.set({
            ownerName: data.fullName,
            makeModelYear: data.vehicleModelYear,
            registration: data.registrationNumber,
            serviceStatus: data.bookingStatus, // Matches [booking_status] in SQL
            serviceDate: data.slot // Matches [Slot] in SQL
          });
        },
        error: (err) => {
          console.error('Could not fetch booking:', err);
          this.bookingSig.set(null);
        }
      });
    }
  }

  statusSig = computed(() => this.bookingSig()?.serviceStatus ?? 'BOOKED');

  stageData = computed(() => {
    const b = this.bookingSig();
    const format = (iso?: string | null) =>
      iso ? new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          }) : null;

    const bookedMeta = b ? format(b.serviceDate) : null;
    const completedMeta =
      b && b.serviceStatus !== 'COMPLETED' && b.serviceDate
        ? `ETA: ${format(b.serviceDate)}`
        : b && b.serviceStatus === 'COMPLETED' ? 'Done' : null;

    return [
      { key: 'BOOKED', title: 'Booked', meta: bookedMeta },
      { key: 'VEHICLE_RECEIVED', title: 'Vehicle Received', meta: null },
      { key: 'SERVICE_IN_PROGRESS', title: 'Service In‑Progress', meta: null },
      { key: 'COMPLETED', title: 'Completed', meta: completedMeta },
    ];
  });

  stepState(index: number): 'completed' | 'current' | 'pending' {
    const idx = this.steps.indexOf(this.statusSig());
    if (index < idx) return 'completed';
    if (index === idx) return 'current';
    return 'pending';
  }
}