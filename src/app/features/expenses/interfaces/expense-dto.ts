import { Currency } from '../../../shared/constants/currency.constants';
import { CATEGORY_VALUES } from '../../../shared/constants/expense.constants';

// todo
// export type PaymentMethod = 'cash' | 'card' | 'transfer';

export type Category = (typeof CATEGORY_VALUES)[number];

export interface CreateExpenseDto {
  category: Category;
  title: string;
  description?: string;
  amount: number;
  currency: Currency;
  expenseDate: Date;
}
