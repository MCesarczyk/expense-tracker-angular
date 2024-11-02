import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../expense/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.less'
})
export class ExpenseListComponent {
    expenses: any[] = [];
    isFormVisible = false;
    newExpense = { name: '', amount: 0, category: '', account: '' };
    categories = ['Baby', 'Beauty', 'Bills', 'Car', 'Clothing', 'Education',
    'Electronic', 'Entertainment', 'Food', 'Health', 'Home', 'Insurance',
    'Shopping', 'Social', 'Sport', 'Tax', 'Telephone', 'Transportation'];
    // Example categories
    accounts = ['Savings', 'Cash', 'Card']
    constructor(private expenseService: ExpenseService) { }

    ngOnInit() {
        // Subscribe to the expenses observable
        this.expenseService.expenses$.subscribe(expenses => {
            this.expenses = expenses;
        });
    }

    openExpenseForm() {
        this.isFormVisible = true;
    }

    closeExpenseForm() {
        this.isFormVisible = false;
        this.newExpense = { name: '', amount: 0, category: '', account: '' };
    }

    addExpense() {
        if (this.newExpense.name && this.newExpense.amount && this.newExpense.category
        && this.newExpense.account) {
            this.expenseService.addExpense(this.newExpense);
            this.closeExpenseForm();
        }
    }

    deleteExpense(expense: any) {
        const index = this.expenses.findIndex(e => e === expense);
        // Find index based on the expense object
        if (index >= 0) {
            this.expenseService.deleteExpense(index);
        } else {
            console.error('Expense not found for deletion');
        }
    }

}
