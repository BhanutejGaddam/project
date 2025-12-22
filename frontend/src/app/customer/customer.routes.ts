import { Routes } from "@angular/router";
import { BookServiceComponent } from "./book-service/book-service.component";
import { TrackServiceComponent } from "./track-service/track-service.component";
import { PurchaseHistoryComponent } from "./purchase-history/purchase-history.component";

export const customerRoutes:Routes=[
    {
        path:'',
        redirectTo:'book-service',
        pathMatch:'full'
    },
    {
        path:'book-service',
        component:BookServiceComponent
    },
    {
        path:'track-service',
        component:TrackServiceComponent
    },
    {
        path:'purchase-history',
        component:PurchaseHistoryComponent
    }
]