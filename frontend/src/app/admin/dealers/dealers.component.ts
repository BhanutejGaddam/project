import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DealerService } from '../admin.service'; 

type DealerForm = {
  d_storeName: string;
  dealerFirstName: string;
  dealerMiddleName?: string;
  dealerLastName?: string;
  d_mail: string;
  d_phone: string;
  d_username: string;
  d_password: string;
  d_city: string;
  d_state: string;
  address: string;
};

@Component({
  selector: 'app-dealer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css'] 
})
export class DealersComponent implements OnInit {
  dealers: any[] = []; 
  showAddForm = false;
  feedback = '';
  
  form: DealerForm = this.getEmptyForm();

  showContact = false;
  selectedDealer: any = null;
  contactForm: FormGroup;
  submitting = false;
  submitSuccess = false;

  @ViewChild('contactModal') contactModalRef?: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private dealerService: DealerService) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
      contactMethod: ['email'],
      bestTime: ['afternoon'],
    });
  }

  ngOnInit(): void {
    this.loadDealers();
  }

  loadDealers(): void {
    this.dealerService.getDealers().subscribe({
      next: (data) => {
        this.dealers = data;
      },
      error: (err) => {
        console.error('Error fetching dealers', err);
        this.feedback = 'Could not load dealers from server.';
      }
    });
  }

  private getEmptyForm(): DealerForm {
    return {
      d_storeName: '',
      dealerFirstName: '',
      dealerMiddleName: '',
      dealerLastName: '',
      d_mail: '',
      d_phone: '',
      d_username: '',
      d_password: '',
      d_city: '',
      d_state: '',
      address: ''
    };
  }

  openAddDealerForm(): void {
    this.showAddForm = true;
    this.feedback = '';
    this.form = this.getEmptyForm();
  }

  cancelAddDealer(): void {
    this.showAddForm = false;
    this.form = this.getEmptyForm();
  }

  saveDealer(): void {
    const f = this.form;
    if (!f.dealerFirstName?.trim() || !f.address?.trim()) {
      this.feedback = 'Please fill in Dealer First Name and Address.';
      return;
    }

    // This object structure matches your .NET DealerPostDto
    const dealerDto = {
      dealerId: "D" + Math.floor(100 + Math.random() * 900), 
      dFirstName: f.dealerFirstName.trim(),
      dMiddleName: f.dealerMiddleName?.trim() || '',
      dLastName: f.dealerLastName?.trim() || '',
      dMailId: f.d_mail.trim(),
      dPhone: f.d_phone.trim(), 
      storeName: f.d_storeName.trim() || f.dealerFirstName.trim(),
      dPassword: f.d_password,
      storeAddress: f.address.trim(),
      city: f.d_city,
      state: f.d_state,
      dUsername: f.d_username
    };

    this.dealerService.addDealer(dealerDto).subscribe({
      next: (res) => {
        this.feedback = res.message;
        this.showAddForm = false;
        this.loadDealers(); 
        setTimeout(() => (this.feedback = ''), 3000);
      },
      error: (err) => {
        this.feedback = 'Failed to save: ' + (err.error?.message || 'Server Error');
      }
    });
  }

  // --- UI Methods ---
  openContact(dealer: any): void {
    this.selectedDealer = dealer;
    this.submitSuccess = false;
    this.submitting = false;
    this.showContact = true;
    setTimeout(() => document.getElementById('fullName')?.focus(), 0);
  }

  closeContact(): void {
    this.showContact = false;
    this.selectedDealer = null;
    this.contactForm.reset({ contactMethod: 'email', bestTime: 'afternoon' });
  }

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.submitSuccess = true;
      setTimeout(() => this.closeContact(), 1800);
    }, 1200);
  }
}