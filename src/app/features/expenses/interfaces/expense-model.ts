import { CreateExpenseDto } from './expense-dto';

export interface ExpenseModel extends CreateExpenseDto {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
