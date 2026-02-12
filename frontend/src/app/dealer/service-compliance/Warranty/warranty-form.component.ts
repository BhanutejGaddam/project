import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WarrantyService } from '../Services/warranty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warranty-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './warranty-form.component.html'
})
export class WarrantyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(WarrantyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  isEdit = false;
  vehicleNo: string | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      vehicleId: ['', Validators.required], // String type for MH12...
      issuedDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });

    this.vehicleNo = this.route.snapshot.paramMap.get('id');
    if (this.vehicleNo) {
      this.isEdit = true;
      this.service.getById(this.vehicleNo).subscribe(w => {
        if (w) {
          this.form.patchValue({
            vehicleId: w.vehicleNumber,
            status: w.status,
            issuedDate: w.issuedDate.split('T')[0],
            expiryDate: w.expiryDate.split('T')[0]
          });
          this.form.get('vehicleId')?.disable(); // PK cannot be edited
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const val = this.form.getRawValue();
    const obs = this.isEdit ? this.service.update(this.vehicleNo!, val) : this.service.create(val);
    
    obs.subscribe(() => this.router.navigate(['/dealer/warranty-list']));
  }

  cancel() { this.router.navigate(['/dealer/warranty-list']); }
}