import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: UserDashboardComponent,
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
