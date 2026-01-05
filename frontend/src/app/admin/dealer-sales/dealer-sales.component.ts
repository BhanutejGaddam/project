import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
 
type Dealer = {
  dealerID: number;
  dealerName: string;
  address: string;
  contact: any;
  managedBy: string;
};
 
@Component({
  selector: 'app-admin-dealer-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dealer-sales.component.html',
  styleUrl: './dealer-sales.component.css'
})
export class AdminDealerSalesComponent {
  dealers: Dealer[] = [
    {
      dealerID: 101,
      dealerName: 'Dealer One',
      address: 'Plot 12, Magarpatta City, Hadapsar, Pune, MH 411028',
      contact: 'vinayak.p@dealer.com , 9876543210',
      managedBy: 'Vinayak Patangankar'
    },
    {
      dealerID: 102,
      dealerName: 'Dealer Two',
      address: 'Shop 8, FC Road, Shivajinagar, Pune, MH 411005',
      contact: 'pooja.k@dealer.com , 9876543211',
      managedBy: 'Pooja Kumari'
    },
    {
      dealerID: 103,
      dealerName: 'Dealer Three',
      address: 'Sr. No. 15, Baner, Pune, MH 411045',
      contact: 'anita.d@dealer.com, 9876543212',
      managedBy: 'Anita Deshmukh'
    },
    {
      dealerID: 104,
      dealerName: 'Dealer Four',
      address: 'Phase 1, Hinjewadi IT Park, Pune, MH 411057',
      contact: 'rahul.n@dealer.com, 9876543213',
      managedBy: 'Rahul Nerkar'
    }
  ];
  trackByDealerId(index: number, dealer: Dealer): number {
    return dealer.dealerID;
  }
}