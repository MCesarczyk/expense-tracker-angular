import { CreateExpenseDto } from "../dtos/create-expense.dto";

export interface NewExpense extends Omit<CreateExpenseDto, 'description' | 'completed' | 'date' | 'userId'> { }
