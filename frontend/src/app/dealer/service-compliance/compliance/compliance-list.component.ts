import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- 1. IMPORT THIS
import { RouterLink } from '@angular/router';
import { ComplianceService } from '../Services/compliance.service';
import { ComplianceRecord } from '../Models/compliance.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compliance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // <--- 2. ADD TO THIS ARRAY
  templateUrl: './compliance-list.component.html',
  styleUrls: ['./compliance-list.component.css']
})
export class ComplianceListComponent {
  private service = inject(ComplianceService);
  
  records$!: Observable<ComplianceRecord[]>;
  vehicleId: string = ''; // <--- 3. Ensure this is a string, not null

  constructor() {
    this.load();
  }

  load() {
    this.records$ = this.service.list();
  }

  onVehicleChange(): void {
    if (this.vehicleId && this.vehicleId.trim() !== '') {
      // Assuming your service has a search/filter method
      this.records$ = this.service.listByVehicle(this.vehicleId);
    } else {
      this.load();
    }
  }

  remove(vId: string): void {
    if (confirm(`Delete record for ${vId}?`)) {
      this.service.delete(vId).subscribe(() => this.load());
    }
  }
}