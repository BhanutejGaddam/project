import { Component, DestroyRef, inject, OnInit,signal } from '@angular/core';
import { customerData } from './customer.interface';
import { CustomerService } from './customers.services';
import { ReactiveFormsModule, FormGroup,FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-customers',
  standalone:true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers:customerData[]=[];
  form=new FormGroup({
    search:new FormControl<string>('')
  })
  // constructor(private customerServices:CustomerService){}
  private customerServices=inject(CustomerService);
  // entered=signal<string>('');
  customers_sig  = this.customerServices.customers;
  entered_text   = this.customerServices.entered_text;

  private destroyRef=inject(DestroyRef);
  search_result = this.customerServices.search_result;

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
