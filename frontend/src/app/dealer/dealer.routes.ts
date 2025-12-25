import { Routes } from "@angular/router";
import { MyInventoryComponent } from "./my-inventory/my-inventory.component";
import { CustomersComponent } from "./customers/customers.component";
import { ServiceComplianceComponent } from "./service-compliance/service-compliance.component";
import { MySalesComponent } from "./my-sales/my-sales.component";

export const dealerRoutes:Routes=[
    {
        path:'',
        redirectTo:'my-inventory',
        pathMatch:'full'
    },
    {
        path:'my-inventory',
        component:MyInventoryComponent
    },
    {
        path:'customers',
        component:CustomersComponent
    },
    {
        path:'service-compliance',
        component:ServiceComplianceComponent
    },
    {
        path:'my-sales',
        component:MySalesComponent
    },
    {
        path:'dealer-sales',
        component:MySalesComponent
    },
  

  {
    path: '',
    redirectTo: 'admin/dealer-sales',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        // Clicking 'dealer-sales' in the UI will navigate here
        path: 'dealer-sales',
        loadComponent: () => 
          import('./my-sales/my-sales.component') // Points to the MySalesComponent
            .then(m => m.MySalesComponent)
      }
    ]
  },
  {
    path: 'dealer',
    children: [
      {
        path: 'my-sales',
        loadComponent: () => 
          import('./my-sales/my-sales.component')
            .then(m => m.MySalesComponent)
      }
    ]
  }
];
