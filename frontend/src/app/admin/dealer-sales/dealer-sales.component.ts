import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
 import { DealerService } from '../admin.service'; 

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
export class AdminDealerSalesComponent implements OnInit {
  feedback = '';
 dealers: any[] = [];
  
  dealerService=inject(DealerService);

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

}