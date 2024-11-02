import { Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './auth/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'expenses', component: ExpenseListComponent, canActivate: [authGuard] },
];
