import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WarrantyService } from '../Services/warranty.service';
import { Warranty } from '../Models/warranty.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-warranty-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './warranty-form.component.html',
  styleUrls: ['./warranty-form.component.css']
})
export class WarrantyFormComponent implements OnInit {
  isEdit = false;
  id: number | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: WarrantyService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleId: [0, [Validators.required, Validators.min(1)]],
      dealerId: [0, [Validators.required, Validators.min(1)]],
      issuedDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      coverageDetails: ['', [Validators.required, Validators.minLength(5)]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.service.getById(this.id).pipe(first()).subscribe(w => {
        if (w) this.form.patchValue(w);
      });
    }
  }

  save(): void {
    const payload = this.form.value as Warranty;
    if (this.isEdit && this.id) {
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
