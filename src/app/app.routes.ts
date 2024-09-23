import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [tokenValidateGuard],
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        //canActivate: [tokenValidateGuard],
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
