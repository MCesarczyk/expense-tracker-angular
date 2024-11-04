import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExpenseDto } from './dtos/expense.dto';
import { HttpClient } from '@angular/common/http';
import { envs } from '../shared/envs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = envs.getApiUrl();

    getAllExpenses(): Observable<ExpenseDto[]> {
        return this.http.get<ExpenseDto[]>(`${this.baseUrl}/expense`);
    }

    getExpenseById(id: string): Observable<ExpenseDto> {
        return this.http.get<ExpenseDto>(`${this.baseUrl}/expense/${id}`);
    }

    addExpense(expense: ExpenseDto) {
        return this.http.post<ExpenseDto>(`${this.baseUrl}/expense`, expense)
    }


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
