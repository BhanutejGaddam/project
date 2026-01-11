import { Routes } from "@angular/router";
import { MyInventoryComponent } from "./my-inventory/my-inventory.component";
import { CustomersComponent } from "./customers/customers.component";
import { ServiceComplianceComponent } from "./service-compliance/service-compliance.component";
import { MySalesComponent } from "./my-sales/my-sales.component";
import { WarrantyListComponent } from "./service-compliance/Warranty/warranty-list.component";
import { WarrantyFormComponent } from "./service-compliance/Warranty/warranty-form.component";
import { ComplianceListComponent } from "./service-compliance/compliance/compliance-list.component";
import { ComplianceFormComponent } from "./service-compliance/compliance/compliance-form.component";
import { ServiveHistoryComponent } from "./servive-history/servive-history.component";
import { ServiceStatusComponent } from "./service-status/service-status.component";
import { EditServiceStatusComponent } from "./edit-service-status/edit-service-status.component";

export const dealerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'my-inventory',
    pathMatch: 'full'
  },
  {
    path: 'my-inventory',
    component: MyInventoryComponent
  },
 
{
    path: 'customers',
    children: [
      { path: '', component: CustomersComponent },
      { path: 'servicehistory/:id', component: ServiveHistoryComponent }
    ]
  },
 
  {
    path: 'service-compliance',
    component: ServiceComplianceComponent,
    children: [
      { path: 'warranties', component: WarrantyListComponent },
      { path: 'warranties/new', component: WarrantyFormComponent },
      { path: 'warranties/:id', component: WarrantyFormComponent },
      { path: 'compliance', component: ComplianceListComponent },
      { path: 'compliance/new', component: ComplianceFormComponent },
      { path: 'compliance/:id', component: ComplianceFormComponent },
      { path: '', redirectTo: 'warranties', pathMatch: 'full' }
    ]
  },
  {
    path: 'my-sales',
    component: MySalesComponent
  },
  {
    path:'service-status',
    // component:ServiceStatusComponent
    children:[
      {
        path:'',
        component:ServiceStatusComponent
      },
      {
        path:'edit',
        component:EditServiceStatusComponent
      }
    ]
  }
];
 
 