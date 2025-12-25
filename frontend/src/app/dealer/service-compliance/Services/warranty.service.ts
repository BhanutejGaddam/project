import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Warranty } from '../Models/warranty.model';

@Injectable({ providedIn: 'root' })
export class WarrantyService {
  private readonly store$ = new BehaviorSubject<Warranty[]>([
    {
      warrantyId: 1,
      vehicleId: 'MH12TL3400',
      coverageDetails: 'Powertrain, 3 years / 60,000 km',
      issuedDate: '2023-01-01',
      expiryDate: '2026-01-01',
      dealerId: 21,
      status: 'ACTIVE'
    },
    {
      warrantyId: 2,
      vehicleId: 'MH12TL3423',
      coverageDetails: 'Powertrain, 3 years / 60,000 km',
      issuedDate: '2023-01-01',
      expiryDate: '2026-01-01',
      dealerId: 21,
      status: 'EXPIRED'
    },
    {
      warrantyId: 3,
      vehicleId: 'MH12TL3450',
      coverageDetails: 'Powertrain, 3 years / 60,000 km',
      issuedDate: '2023-01-01',
      expiryDate: '2026-01-01',
      dealerId: 21,
      status: 'ACTIVE'
    },
    {
      warrantyId: 4,
      vehicleId: 'MH12TL3456',
      coverageDetails: 'Powertrain, 3 years / 60,000 km',
      issuedDate: '2019-01-01',
      expiryDate: '2023-01-01',
      dealerId: 21,
      status: 'EXPIRED'
    },
    {
      warrantyId: 5,
      vehicleId: 'MH12TL3467',
      coverageDetails: 'Powertrain, 3 years / 60,000 km',
      issuedDate: '2020-01-01',
      expiryDate: '2023-01-01',
      dealerId: 21,
      status: 'ACTIVE'
    },
    {
      warrantyId: 6,
      vehicleId: 'MH12TL3478',
      coverageDetails: 'Basic, 2 years / 40,000 km',
      issuedDate: '2021-06-15',
      expiryDate: '2023-06-15',
      dealerId: 22,
      status: 'EXPIRED'
    }
  ]);

  list(): Observable<Warranty[]> {
    return this.store$.asObservable();
  }

  getById(id: number): Observable<Warranty | undefined> {
    return this.store$.pipe(map(list => list.find(w => w.warrantyId === id)));
  }

  create(warranty: Warranty): void {
    const nextId = Math.max(0, ...this.store$.value.map(w => w.warrantyId ?? 0)) + 1;
    this.store$.next([...this.store$.value, { ...warranty, warrantyId: nextId }]);
  }

  update(id: number, partial: Partial<Warranty>): void {
    this.store$.next(
      this.store$.value.map(w => (w.warrantyId === id ? { ...w, ...partial } : w))
    );
  }

  delete(id: number): void {
    this.store$.next(this.store$.value.filter(w => w.warrantyId !== id));
  }
}
