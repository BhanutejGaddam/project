import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from './customers.services';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { customerData } from './customer.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  showForm = false;
  addForm!: FormGroup;
  form!: FormGroup;
  
  private destroyRef = inject(DestroyRef);
  customers = signal<customerData[]>([]);
  entered_text = signal<string>('');
  private customerServices = inject(CustomerService);
  private fb = inject(FormBuilder);

  public readonly search_result = computed(() => {
    const term = this.entered_text().trim().toLowerCase();
    const list = this.customers();
    if (!term) return list;

    return list.filter(c =>
      c.customer_name.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {

    this.form = new FormGroup({
    search: new FormControl<string>('')
  });

    this.addForm = this.fb.group({
      c_first_name: ['', Validators.required],
      c_middle_name: ['', Validators.required],
      c_last_name: ['', Validators.required],
      c_username: ['', Validators.required],
      c_password: ['', Validators.required],
      c_mail_id: ['', [Validators.required, Validators.email]],
      c_contact_info: [null, Validators.required],
      c_address: ['', Validators.required],
      vehicle_model_year: ['', Validators.required],
      vehicle_price:['',Validators.required],
      purchase_date: ['', Validators.required],
      // Removed: dealer_id, warranty_issued_date, and warranty_expiry_date
      // The Backend now handles these automatically.
    });

    this.form.get('search')?.valueChanges
    .pipe(
      debounceTime(300), // Wait for user to stop typing
      distinctUntilChanged(), // Only trigger if the value actually changed
      takeUntilDestroyed(this.destroyRef) // Clean up on component destroy
    )
    .subscribe(value => {
      this.entered_text.set(value || '');
    });

    this.fetchCustomers();
  }

  openAddForm() {
    this.showForm = true;
  }

  cancelAddCustomer() {
    this.showForm = false;
    this.addForm.reset();
  }

  saveCustomer() {
    console.log("hii");
    if (this.addForm.valid) {
      // We send the form value directly. 
      // The backend will extract the Dealer ID from the JWT 'db_id' claim.
      this.customerServices.addCustomer(this.addForm.value).subscribe({
        next: (res) => {
          alert('Customer added successfully! Compliance records generated.');
          this.addForm.reset();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error adding customer', err);
          alert('Failed to add customer. Ensure you are authorized.');
        }
      });
    }
  }

  fetchCustomers() {
  this.customerServices.getMyCustomers().subscribe({
    next: (data: any[]) => {
      // Map backend model to your frontend customerData interface
      const mappedData = data.map((c, index) => ({
        sl_no: index + 1,
        customer_id: c.customerId,
        // Combine names for your template
        customer_name: `${c.cFirstName} ${c.cLastName}`, 
        // We use the default vehicle number we set in the controller
        purchase_date: c.purchaseDate,
        loyalty_points: c.loyaltyPoints || 100,
        offers_eligible: c.loyaltyPoints > 500 ? "Service10" : "Service5"
      }));
      // Update your signal so the table and search feature react
      this.customers.set(mappedData);
    },
    error: (err) => console.error('Error loading customers:', err)
  });
}
}
