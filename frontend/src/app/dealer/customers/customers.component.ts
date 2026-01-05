import { Component, DestroyRef, inject, OnInit,signal } from '@angular/core';
import { customerData } from './customer.interface';
import { CustomerService } from './customers.services';
import { ReactiveFormsModule, FormGroup,FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from "@angular/router";
import { customerInfo } from './customers.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone:true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  showForm = false;
  id:number=0;
  slNo:number=0;
  customers:customerData[]=[];
  form=new FormGroup({
    search:new FormControl<string>('')
  })

  addForm=new FormGroup({
    customerName:new FormControl<string>(''),
    customerAddress:new FormControl<string>(''),
    vehicleNumber:new FormControl<string>(''),
    vehiclePurchaseDate:new FormControl<string>(''),
    customerMail:new FormControl<string>(''),
    customerPhoneNumber:new FormControl<string>('')
  })
  
  private customerServices=inject(CustomerService);
  customers_sig  = this.customerServices.customers;
  entered_text   = this.customerServices.entered_text;

  private destroyRef=inject(DestroyRef);
  search_result = this.customerServices.search_result;

  openAddForm(){
    this.showForm=true;
  }

  saveCustomer(){
    this.id=Math.floor(1000 + Math.random() * 9000);
    this.slNo=customerInfo.length+1;
    const raw=this.addForm.value;
    const newCustomer:customerData={
      sl_no:this.slNo,
      customer_name:raw.customerName ?? '',
      customer_id:String(this.id),
      vehicle_id:raw.vehicleNumber ?? '',
      purchase_date: raw.vehiclePurchaseDate ?? '',
      loyalty_points:100,
      offers_eligible:"Serice5"
    }
    customerInfo.push(newCustomer);
    this.addForm.reset();
    this.showForm = false;
  }

  cancelAddCustomer(){
    this.showForm = false;
  }

  ngOnInit(): void {
    this.customers=this.customerServices.getData();
    this.form.valueChanges.pipe(
      map(value=>value.search ?? ''),
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(searchText=>{
      // this.entered.set(searchText);
      this.customerServices.updateSearch(searchText);
    })
  }
}
