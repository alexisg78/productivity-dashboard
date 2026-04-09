export type Currency = 'ARS' | 'USD' | 'EUR';
export const CATEGORY_VALUES = [
  'SERV',
  'CREDIT-CARD',
  'DEBIT-CARD',
  'COMP',
  'TRANSP',
  'VET',
  'OTRO',
] as const;
export type Category = (typeof CATEGORY_VALUES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  SERV: 'Servicios',
  'CREDIT-CARD': 'Tarjeta de crédito',
  'DEBIT-CARD': 'Tarjeta de débito',
  COMP: 'Compras',
  TRANSP: 'Transporte',
  VET: 'Veterinaria',
  OTRO: 'Otro',
};

// todo
// export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface ExpenseModel {
  id: number;
  category: Category;
  title: string;
  description: string;
  amount: number;
  currency: Currency;
}
