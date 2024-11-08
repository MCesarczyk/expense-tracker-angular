import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { ExpenseFacade } from '../../expense/expense.facade';
import { NewExpense } from '../../expense/interfaces/new-expense.interface';
@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.less'
})
export class ExpenseListComponent {
    private readonly expenseFacade = inject(ExpenseFacade);
    expenses$ = this.expenseFacade.expenses$;
    expenseId$ = new BehaviorSubject<string | null>(null);
    isFormVisible = false;
    isConfirmationModalVisible = false;
    newExpense = { name: '', amount: 0, category: '', account: '' };
    categories = ['Baby', 'Beauty', 'Bills', 'Car', 'Clothing', 'Education',
        'Electronic', 'Entertainment', 'Food', 'Health', 'Home', 'Insurance',
        'Shopping', 'Social', 'Sport', 'Tax', 'Telephone', 'Transportation'];
    accounts = ['Savings', 'Cash', 'Card']

    ngOnInit() {
        this.expenseFacade.checkUser();
        this.refreshItems();
    }

    refreshItems() {
        this.expenseFacade.loadExpenses();
    }

    openExpenseForm() {
        this.isFormVisible = true;
        this.expenseFacade.loadUserId();
    }

    closeExpenseForm() {
        this.isFormVisible = false;
        this.newExpense = { name: '', amount: 0, category: '', account: '' };
    }

    openConfirmationModal() {
        this.isConfirmationModalVisible = true;
    }

    askForConfirmation(expenseId: string) {
        this.openConfirmationModal();
        this.expenseId$.next(expenseId);
    }

    closeConfirmationModal() {
        this.isConfirmationModalVisible = false;
    }

    addExpense(newExpense: NewExpense) {
        const success = this.expenseFacade.addExpense(newExpense);
        if (success) {
            this.closeExpenseForm();
        }
    }

    deleteExpense(expenseId: string | null) {
        const success = this.expenseFacade.deleteExpense(expenseId);
        if (success) {
            this.closeConfirmationModal();
        }
    }
}
