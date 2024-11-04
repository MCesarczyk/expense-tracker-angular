export interface ExpenseDto {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: string;
  account: string;
  completed: boolean;
  date: string;
  userId: string;
}
