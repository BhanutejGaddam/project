import { Routes } from '@angular/router';
import { LoginComponent,canLeaveLoginpage } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DealerComponent } from './dealer/dealer.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { customerRoutes } from './customer/customer.routes';
import { dealerRoutes } from './dealer/dealer.routes';
import { adminRoutes } from './admin/admin.routes';
import { MyInventoryComponent } from './dealer/my-inventory/my-inventory.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
    },
    {
        path: 'admin-login',
        component: LoginComponent,
        canDeactivate:[canLeaveLoginpage]
    },
    {
        path: 'dealer-login',
        component: LoginComponent,
        canDeactivate:[canLeaveLoginpage]
    },
    {
        path: 'customer-login',
        component: LoginComponent,
        canDeactivate:[canLeaveLoginpage]
    },
    {
        path:'dealer',
        component: DealerComponent,
        children: dealerRoutes
    },
    {
        path:'admin',
        component:AdminComponent,
        children:adminRoutes
    },
    {
        path:'customer',
        component:CustomerComponent,
        children:customerRoutes
    },
    {
        path:'**',
        component: HomeComponent
    },
];
