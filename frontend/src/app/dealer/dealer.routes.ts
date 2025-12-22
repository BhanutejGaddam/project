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
    }
]