import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BookingData,bookingDataList } from '../../bookingData';

type ServiceStatus = BookingData['serviceStatus'];

@Component({
  selector: 'app-service-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-service.component.html',
  styleUrls: ['./track-service.component.css'],
})
export class TrackServiceComponent {

  bookingSig = signal<BookingData | null>(null);

 
  readonly steps = [
    'BOOKED',
    'VEHICLE_RECEIVED',
    'SERVICE_IN_PROGRESS',
    'COMPLETED',
  ] as const;

  fetchRahul(): void {
    const targetEmail = 'rahul.sharma@example.com';
    const match =
      bookingDataList.find(
        (b) => b.email.trim().toLowerCase() === targetEmail
      ) ?? null;
    this.bookingSig.set(match);
  }

  ngOnInit() {
    this.fetchRahul();
  }


  statusSig = computed<ServiceStatus>(
    () => this.bookingSig()?.serviceStatus ?? 'BOOKED'
  );

  stageData = computed(() => {
    const b = this.bookingSig();
    const format = (iso?: string | null) =>
      iso
        ? new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
        : null;

    const bookedMeta = b ? format(b.serviceDate) : null;
    const completedMeta =
      b && b.serviceStatus !== 'COMPLETED' && b.serviceDate
        ? `ETA: ${format(b.serviceDate)}`
        : b && b.serviceStatus === 'COMPLETED'
        ? 'Done'
        : null;

    return [
      { key: 'BOOKED' as const, title: 'Booked', meta: bookedMeta },
      { key: 'VEHICLE_RECEIVED' as const, title: 'Vehicle Received', meta: null },
      { key: 'SERVICE_IN_PROGRESS' as const, title: 'Service In‑Progress', meta: null },
      { key: 'COMPLETED' as const, title: 'Completed', meta: completedMeta },
    ];
  });

  stepState(index: number): 'completed' | 'current' | 'pending' {
    const idx = this.steps.indexOf(this.statusSig());
    if (index < idx) return 'completed';
    if (index === idx) return 'current';
    return 'pending';
  }

  progressPercent(): number {
    const idx = this.steps.indexOf(this.statusSig());
    const completedCount = Math.max(0, idx);
    return Math.round((completedCount / (this.steps.length - 1)) * 100);
  }
}
