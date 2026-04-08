export type Currency = 'ARS' | 'USD' | 'EUR';

// todo
// export type Category = 'food' | 'transport' | 'shopping' | 'services' | 'other';
// export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface ExpenseModel {
  id: number;
  category: string;
  title: string;
  description: string;
  amount: number;
  currency: Currency;
}
