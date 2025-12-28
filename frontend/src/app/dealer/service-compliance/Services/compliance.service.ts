import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplianceRecord } from '../Models/compliance.model';

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private readonly store$ = new BehaviorSubject<ComplianceRecord[]>([
    {
      complianceId: 1,
      vehicleId: 'MH12TL3456',
      PollutionCheck: 'COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
      
    },
    {
      complianceId: 2,
      vehicleId: 'MH12TL3560',
      PollutionCheck: 'NON_COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-04-20',
      expiryDate: '2025-04-20',
    },
    {
      complianceId: 2,
      vehicleId: 'MH12TL3400',
      PollutionCheck: 'COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
    },
    {
      complianceId: 2,
      vehicleId: 'MH12TL3400',
      PollutionCheck: 'COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
    },
    {
      complianceId: 3,
      vehicleId: 'MH12TL3400',
      PollutionCheck: 'COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
    },
    {
      complianceId: 4,
      vehicleId: 'MH12TL3400',
      PollutionCheck: 'COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
    },
    {
      complianceId: 5,
      vehicleId: 'MH12TL3400',
      PollutionCheck: 'NON_COMPLIANT',
      fitness: 'COMPLIANT',
      RC: 'NON_COMPLIANT',
      checkDate: '2024-02-10',
      expiryDate: '2025-02-10',
    }
  ]);

  list(): Observable<ComplianceRecord[]> {
    return this.store$.asObservable();
  }

  getById(id: string): Observable<ComplianceRecord | undefined> {
    return this.store$.pipe(map(list => list.find(r => r.vehicleId === id)));
  }

  listByVehicle(vehicleId: string): Observable<ComplianceRecord[]> {
    return this.store$.pipe(map(list => list.filter(r => r.vehicleId === vehicleId)));
  }

  create(record: ComplianceRecord): void {
    const nextId = Math.max(0, ...this.store$.value.map(r => r.complianceId ?? 0)) + 1;
    this.store$.next([...this.store$.value, { ...record, complianceId: nextId }]);
  }

  update(id: number, partial: Partial<ComplianceRecord>): void {
    this.store$.next(
      this.store$.value.map(r => (r.complianceId === id ? { ...r, ...partial } : r))
    );
  }

  delete(id: number): void {
    this.store$.next(this.store$.value.filter(r => r.complianceId !== id));
  }
}
