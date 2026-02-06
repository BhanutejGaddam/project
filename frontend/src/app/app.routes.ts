import { Routes } from '@angular/router';
import { canLeaveLoginpage } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
    },
    {
        path: 'admin-login',
        loadComponent:()=>import('./login/login.component').then(mod=>mod.LoginComponent),
        canDeactivate:[canLeaveLoginpage],
    },
    {
        path: 'dealer-login',
        loadComponent:()=>import('./login/login.component').then(mod=>mod.LoginComponent),
        canDeactivate:[canLeaveLoginpage],
    },
    {
        path: 'customer-login',
        loadComponent:()=>import('./login/login.component').then(mod=>mod.LoginComponent),
        canDeactivate:[canLeaveLoginpage],
    },

    // ... existing imports
{
    path: 'register',
    loadComponent: () => import('./customer/customer-register/customer-register.component').then(m => m.CustomerRegisterComponent)
},
    {
        path:'dealer',
        loadComponent() {
            return import('./dealer/dealer.component').then(mod=>mod.DealerComponent);
        },
        loadChildren:()=>import('./dealer/dealer.routes').then(mod=>mod.dealerRoutes)
    },
    {
        path:'admin',
        // component:AdminComponent,
        loadComponent:()=>import('./admin/admin.component').then(mod=>mod.AdminComponent),
        loadChildren:()=>import('./admin/admin.routes').then(mod=>mod.adminRoutes),
    },
    {
        path:'customer',
        // component:CustomerComponent,
        loadComponent:()=>import('./customer/customer.component').then(mod=>mod.CustomerComponent),
        loadChildren:()=>import('./customer/customer.routes').then(mod=>mod.customerRoutes),
    },
    {
        path:'**',
        component: HomeComponent
    },
  
];