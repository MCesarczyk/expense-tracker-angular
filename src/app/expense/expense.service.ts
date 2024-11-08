import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExpenseDto } from './dtos/expense.dto';
import { HttpClient } from '@angular/common/http';
import { envs } from '../shared/envs';
import { CreateExpenseDto } from './dtos/create-expense.dto';

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

    addExpense(expense: CreateExpenseDto): Observable<ExpenseDto> {
        return this.http.post<ExpenseDto>(`${this.baseUrl}/expense`, expense)
    }

    deleteExpense(id: string): Observable<ExpenseDto> {
        return this.http.delete<ExpenseDto>(`${this.baseUrl}/expense/${id}`);
    }
}
