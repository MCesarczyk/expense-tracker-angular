import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../expense/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { IExpense } from '../../expense/expense.interface';
import { AuthService } from '../../auth/auth.service';
@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.less'
})
export class ExpenseListComponent {
    private readonly expenseService = inject(ExpenseService);
    private readonly authService = inject(AuthService);
    expenses$ = new BehaviorSubject<IExpense[]>([]);
    isFormVisible = false;
    newExpense = { name: '', amount: 0, category: '', account: '' };
    categories = ['Baby', 'Beauty', 'Bills', 'Car', 'Clothing', 'Education',
        'Electronic', 'Entertainment', 'Food', 'Health', 'Home', 'Insurance',
        'Shopping', 'Social', 'Sport', 'Tax', 'Telephone', 'Transportation'];
    accounts = ['Savings', 'Cash', 'Card']

    ngOnInit() {
        this.authService.loadToken();
        this.refreshItems();
    }

    refreshItems() {
        this.expenseService.getAllExpenses().pipe(take(1)).subscribe(expenses => {
            this.expenses$.next(expenses);
        });
    }

    openExpenseForm() {
        this.isFormVisible = true;
    }

    closeExpenseForm() {
        this.isFormVisible = false;
        this.newExpense = { name: '', amount: 0, category: '', account: '' };
    }

    // addExpense() {
    //     if (this.newExpense.name && this.newExpense.amount && this.newExpense.category
    //     && this.newExpense.account) {
    //         this.expenseService.addExpense(this.newExpense);
    //         this.closeExpenseForm();
    //     }
    // }

    // deleteExpense(expense: any) {
    //     const index = this.expenses.findIndex(e => e === expense);
    //     // Find index based on the expense object
    //     if (index >= 0) {
    //         this.expenseService.deleteExpense(index);
    //     } else {
    //         console.error('Expense not found for deletion');
    //     }
    // }

}
