import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'expenses', component: ExpenseListComponent, canActivate: [authGuard] },
];
