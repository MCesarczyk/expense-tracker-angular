import { Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './auth/auth.guard';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'expenses', component: ExpenseListComponent, canActivate: [authGuard] },
];
