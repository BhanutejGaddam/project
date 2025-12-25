import { Routes } from "@angular/router";
import { DealerComponent } from "./dealers/dealers.component";
import { DealerSalesComponent } from "./dealer-sales/dealer-sales.component";
import { DealerInventoryComponent } from "./dealer-inventory/dealer-inventory.component";
import { ViewInventoryComponent } from "./view-inventory/view-inventory.component";

export const adminRoutes:Routes=[
    {
        path:'',
        redirectTo:'dealer-inventory',
        pathMatch:'full'
    },
    {
        path:'dealers',
        component:DealerComponent
    },
    {
        path:'dealer',
        component:DealerComponent
    },
    { path: 'viewinventory', component: ViewInventoryComponent },
    {
        path:'dealer-sales',
        component:DealerSalesComponent
    },
    {
        path:'dealer-inventory',
        component:DealerInventoryComponent
    }
]