import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";
import { ExpenseService } from "./expense.service";
import { ExpenseDto } from "./dtos/expense.dto";
import { AuthService } from "../auth/auth.service";
import { NewExpense } from "./interfaces/new-expense.interface";

@Injectable({
  providedIn: 'root',
})
export class ExpenseFacade {
  private readonly expenseService = inject(ExpenseService);
  private readonly authService = inject(AuthService);

  private expenses$$ = new BehaviorSubject<ExpenseDto[]>([]);
  expenses$ = this.expenses$$.asObservable();

  checkUser() {
    this.authService.loadToken();
    this.authService.identifyUser()?.pipe(take(1)).subscribe();
  }

  loadUserId() {
    this.authService.loadUserId();
  }

  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (expenses) => {
        this.expenses$$.next(expenses);
      },
    });
  }

  addExpense(newExpense: NewExpense): boolean {
    const userId = this.authService.getUserId();
    if (newExpense.name && newExpense.amount && newExpense.category
      && newExpense.account && userId) {
      this.expenseService.addExpense({
        ...newExpense,
        description: 'test',
        completed: false,
        date: new Date().toISOString(),
        userId
      }).pipe(take(1)).subscribe({
        next: () => this.loadExpenses(),
        error: (err) => { console.error(err); return;}
      });
      return true;
    }
    return false;
  }

  deleteExpense(expenseId: string | null): boolean {
    if (!expenseId) return false;
    this.expenseService.deleteExpense(expenseId).pipe(take(1)).subscribe({
      next: () => {
        this.loadExpenses();
      },
      error: (err) => { console.error(err); return; }
    });
    return true;
  }
}
