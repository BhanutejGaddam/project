import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComplianceService } from '../Services/compliance.service';
import { ComplianceRecord } from '../Models/compliance.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compliance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './compliance-list.component.html',
  styleUrls: ['./compliance-list.component.css']
})
export class ComplianceListComponent {
  records$!: Observable<ComplianceRecord[]>;
  vehicleId: string | null = null;

  constructor(private service: ComplianceService) {
    this.records$ = this.service.list();
  }

  onVehicleChange(): void {
    if (this.vehicleId && this.vehicleId.trim() !== '') {
      this.records$ = this.service.listByVehicle(this.vehicleId);
    } else {
      this.records$ = this.service.list();
    }
  }

  remove(id: number): void {
    this.service.delete(id);
  }
}
