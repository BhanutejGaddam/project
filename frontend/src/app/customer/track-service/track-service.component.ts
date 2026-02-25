import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AuthenticationService } from '../../login/authentication.service';
import { TrackedBooking,TimelineStage } from './track-service.interface';
@Component({
  selector: 'app-service-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-service.component.html',
  styleUrls: ['./track-service.component.css'],
})
export class TrackServiceComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  
  // Now holding an array of bookings
  bookingsSig = signal<TrackedBooking[]>([]);

  readonly steps = ['BOOKED', 'VEHICLE_RECEIVED', 'SERVICE_IN_PROGRESS', 'COMPLETED'] as const;

  ngOnInit() {
    const customerId = this.authService.getLoggedInUserId();
    if (customerId) {
      this.authService.getBookingStatus$(customerId).subscribe({
        next: (data: TrackedBooking[]) => {
          this.bookingsSig.set(data);
        },
        error: (err) => {
          console.error('Could not fetch bookings:', err);
          this.bookingsSig.set([]);
        }
      });
    }
  }

  // Helper to format the timeline for each individual booking
  getStageData(booking: TrackedBooking):TimelineStage[] {
    const format = (iso?: string | null) =>
      iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : null;

    return [
      { key: 'BOOKED', title: 'Booked', meta: format(booking.slot) },
      { key: 'VEHICLE_RECEIVED', title: 'Vehicle Received', meta: null },
      { key: 'SERVICE_IN_PROGRESS', title: 'Service In‑Progress', meta: null },
      { key: 'COMPLETED', title: 'Completed', meta: booking.bookingStatus === 'COMPLETED' ? 'Done' : 'ETA: Processing' },
    ];
  }

  getStepState(booking: TrackedBooking, index: number): 'completed' | 'current' | 'pending' {
    const idx = this.steps.indexOf(booking.bookingStatus);
    if (index < idx) return 'completed';
    if (index === idx) return 'current';
    return 'pending';
  }
}