import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ComplianceService } from '../Services/compliance.service';
import { ComplianceRecord } from '../Models/compliance.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-compliance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.css']
})
export class ComplianceFormComponent implements OnInit {
  isEdit = false;
  id: number | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ComplianceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleId: ['', [Validators.required, Validators.minLength(5)]],
      Fitness: ['', [Validators.required, Validators.minLength(3)]],
      RC: ['', [Validators.required, Validators.minLength(3)]],
      PollutionCheck: ['', [Validators.required, Validators.minLength(3)]],
      checkDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      status: ['PENDING', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);

      this.service.getById(this.id).pipe(first()).subscribe(r => {
        if (r) {
          this.form.patchValue(r);
        }
      });
    }
  }

  save(): void {
    const payload = this.form.value as ComplianceRecord;
    if (this.isEdit && this.id !== null) {
      this.service.update(this.id, payload);
    } else {
      this.service.create(payload);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
