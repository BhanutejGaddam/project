import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplianceService } from '../Services/compliance.service';

@Component({
  selector: 'app-compliance-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './compliance-form.component.html'
})
export class ComplianceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ComplianceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  isEdit = false;
  vehicleNo: string | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleId: ['', Validators.required],
      PollutionCheck: ['COMPLIANT', Validators.required],
      fitness: ['COMPLIANT', Validators.required],
      RC: ['COMPLIANT', Validators.required],
      checkDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

    this.vehicleNo = this.route.snapshot.paramMap.get('id');
    if (this.vehicleNo) {
      this.isEdit = true;
      this.service.getById(this.vehicleNo).subscribe(r => {
        if (r) {
          this.form.patchValue({
            vehicleId: r.vehicleNumber,
            PollutionCheck: r.pollutionCheck,
            fitness: r.fitnessCheck,
            RC: r.rcCheck,
            checkDate: r.lastChecked.split('T')[0],
            expiryDate: r.expiry.split('T')[0]
          });
          this.form.get('vehicleId')?.disable();
        }
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    const obs = this.isEdit ? this.service.update(this.vehicleNo!, payload) : this.service.create(payload);
    
    obs.subscribe(() => this.router.navigate(['/dealer/compliance-list']));
  }

  cancel(): void { this.router.navigate(['/dealer/compliance-list']); }
}