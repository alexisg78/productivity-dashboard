// todo
// export type PaymentMethod = 'cash' | 'card' | 'transfer';

import { Currency } from '../../../shared/constants/currency.constants';
import { CATEGORY_VALUES } from '../../../shared/constants/expense.constants';

export type Category = (typeof CATEGORY_VALUES)[number];

export interface ExpenseModel {
  id: number;
  category: Category;
  title: string;
  description: string;
  amount: number;
  currency: Currency;
}
