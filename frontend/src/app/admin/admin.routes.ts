import { Routes } from '@angular/router';
import { DealersComponent } from './dealers/dealers.component';
import { AdminDealerSalesComponent } from './dealer-sales/dealer-sales.component';
import { DealerInventoryComponent } from './dealer-inventory/dealer-inventory.component';
import { MySalesComponent } from '../dealer/my-sales/my-sales.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dealers',
    pathMatch: 'full'
  },
  {
    path: 'dealers',
    component: DealersComponent
  },
  {
    path: 'dealer-sales',
    component: AdminDealerSalesComponent
  },
  { 
    path: 'viewinventory', 
    component: ViewInventoryComponent 
  },
  {
    path: 'dealer-inventory',
    component: DealerInventoryComponent
  },
  {
    path: 'dealer-sales-details',
    component: MySalesComponent
  }
];

