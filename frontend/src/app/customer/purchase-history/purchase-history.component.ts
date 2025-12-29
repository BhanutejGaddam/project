import { Component } from '@angular/core';
import {purchaseData} from './purchase-data';
import { purchaseHistory } from './purchase-data.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-purchase-history',
  imports: [CurrencyPipe],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {
  public readonly serviceHistory:purchaseHistory[]=purchaseData;
}
