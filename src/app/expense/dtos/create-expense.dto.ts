import { ExpenseDto } from "./expense.dto";

export interface CreateExpenseDto extends Omit<ExpenseDto, 'id'> {}
