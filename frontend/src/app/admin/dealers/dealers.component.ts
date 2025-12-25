
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Dealer = {
  dealerID: number;
  dealerName: string;
  address: string;
  Contact: any;
  managedBy: string;
};

type DealerForm = {
  dealerName: string;
  address: string;
  // Contact: any;
  managedBy: string;
};

@Component({
  selector: 'app-dealer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css'] 
})
export class DealerComponent {
  dealers: Dealer[] = [
    {
      dealerID: 101,
      dealerName: 'Dealer One',
      address: 'Plot 12, Magarpatta City, Hadapsar, Pune, MH 411028',
      Contact: 'vinayak.p@dealer.com , 9876543210',
      managedBy: 'Vinayak Patangankar'
    },
    {
      dealerID: 102,
      dealerName: 'Dealer Two',
      address: 'Shop 8, FC Road, Shivajinagar, Pune, MH 411005',
      Contact: 'pooja.k@dealer.com , 9876543211',
      managedBy: 'Pooja Kumari'
    },
    {
      dealerID: 103,
      dealerName: 'Dealer Three',
      address: 'Sr. No. 15, Baner, Pune, MH 411045',
      Contact: 'anita.d@dealer.com, 9876543212',
      managedBy: 'Anita Deshmukh'
    },
    {
      dealerID: 104,
      dealerName: 'Dealer Four',
      address: 'Phase 1, Hinjewadi IT Park, Pune, MH 411057',
      Contact: 'rahul.n@dealer.com, 9876543213',
      managedBy: 'Rahul Nerkar'
    }
  ];

  showAddForm = false;
  feedback = '';
  form: DealerForm = { dealerName: '', address: '', managedBy: '' };

  showContact = false;
  selectedDealer: Dealer | null = null;

  contactForm: FormGroup;
  submitting = false;
  submitSuccess = false;

  @ViewChild('contactModal') contactModalRef?: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
      contactMethod: ['email'],
      bestTime: ['afternoon'],
    });
  }

  get f() { return this.contactForm.controls; }

  openAddDealerForm(): void {
    this.showAddForm = true;
    this.feedback = '';
    this.form = { dealerName: '', address: '', managedBy: '' };
  }

  cancelAddDealer(): void {
    this.showAddForm = false;
    this.form = { dealerName: '', address: '', managedBy: '' };
  }

  saveDealer(): void {
    const { dealerName, address, managedBy } = this.form;

    if (!dealerName?.trim() || !address?.trim() || !managedBy?.trim()) {
      this.feedback = 'Please fill in Dealer Name, Address, and Managed By.';
      return;
    }

    const nextId =
      (this.dealers.length ? Math.max(...this.dealers.map(d => d.dealerID)) : 100) + 1;

    const newDealer: Dealer = {
      dealerID: nextId,
      dealerName: dealerName.trim(),
      address: address.trim(),
      Contact: '',
      managedBy: managedBy.trim()
    };

    this.dealers.push(newDealer);
    this.dealers = [...this.dealers];
    this.showAddForm = false;

    this.feedback = `Dealer "${newDealer.dealerName}" added successfully (ID: ${newDealer.dealerID}).`;
    setTimeout(() => (this.feedback = ''), 2000);
  }

  viewInventory(dealer: Dealer): void {
    console.log('View inventory for:', dealer);
  }

  openContact(dealer: Dealer): void {
    this.selectedDealer = dealer;
    this.submitSuccess = false;
    this.submitting = false;
    this.showContact = true;

    setTimeout(() => {
      const firstInput = document.getElementById('fullName');
      firstInput?.focus();
    }, 0);
  }

  contactDealer(dealer: Dealer): void {
    console.log('Contact dealer:', dealer);
    this.openContact(dealer);
  }

  closeContact(_event?: MouseEvent): void {
    this.showContact = false;
    this.selectedDealer = null;

    this.contactForm.reset({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      contactMethod: 'email',
      bestTime: 'afternoon',
    });
  }

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    // Simulated API call delay; replace with real service later
    setTimeout(() => {
      this.submitting = false;
      this.submitSuccess = true;

      // Auto-close after success (optional)
      setTimeout(() => this.closeContact(), 1800);
    }, 1200);
  }
}
