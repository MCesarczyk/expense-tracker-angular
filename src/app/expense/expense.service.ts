import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IExpense } from './expense.interface';
import { HttpClient } from '@angular/common/http';
import { envs } from '../shared/envs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = envs.getApiUrl();

    getAllExpenses(): Observable<IExpense[]> {
        return this.http.get<IExpense[]>(`${this.baseUrl}/expense`);
    }

    getExpenseById(id: string): Observable<IExpense> {
        return this.http.get<IExpense>(`${this.baseUrl}/expense/${id}`);
    }

    // private expensesKey = 'expenses';
    // private expenses = new BehaviorSubject<IExpense[]>(this.getExpenses());
    // expenses$ = this.expenses.asObservable();

    // private getExpenses(): IExpense[] {
    //     try {
    //         const savedExpenses = localStorage.getItem(this.expensesKey);
    //         return savedExpenses ? JSON.parse(savedExpenses) : [];
    //     } catch (error) {
    //         console.error('Failed to parse expenses from localStorage', error);
    //         return [];
    //     }
    // }

    // private saveExpenses(expenses: IExpense[]) {
    //     try {
    //         localStorage.setItem(this.expensesKey, JSON.stringify(expenses));
    //     } catch (error) {
    //         console.error('Failed to save expenses to localStorage', error);
    //     }
    // }

    // addExpense(expense: IExpense) {
    //     const currentExpenses = this.expenses.value;
    //     currentExpenses.push(expense);
    //     this.saveExpenses(currentExpenses);
    //     this.expenses.next([...currentExpenses]);
    // }


    // deleteExpense(index: number) {
    //     const currentExpenses = this.expenses.value;
    //     if (index >= 0 && index < currentExpenses.length) {
    //         currentExpenses.splice(index, 1);
    //         this.saveExpenses(currentExpenses);
    //         this.expenses.next([...currentExpenses]);
    //     } else {
    //         console.error('Invalid index for deletion');
    //     }
    // }
}
