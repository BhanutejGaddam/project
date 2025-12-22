import { Routes } from "@angular/router";
import { DealersComponent } from "./dealers/dealers.component";
import { DealerSalesComponent } from "./dealer-sales/dealer-sales.component";
import { DealerInventoryComponent } from "./dealer-inventory/dealer-inventory.component";

export const adminRoutes:Routes=[
    {
        path:'',
        redirectTo:'dealers',
        pathMatch:'full'
    },
    {
        path:'dealers',
        component:DealersComponent
    },
    {
        path:'dealer-sales',
        component:DealerSalesComponent
    },
    {
        path:'dealer-inventory',
        component:DealerInventoryComponent
    }
]