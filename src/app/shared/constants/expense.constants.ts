import { Category } from '../../features/expenses/interfaces/expense-model';

export const CATEGORY_VALUES = [
  'SERV',
  'CREDIT-CARD',
  'DEBIT-CARD',
  'COMP',
  'TRANSP',
  'VET',
  'OTRO',
] as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  SERV: 'Servicios',
  'CREDIT-CARD': 'Tarjeta de crédito',
  'DEBIT-CARD': 'Tarjeta de débito',
  COMP: 'Compras',
  TRANSP: 'Transporte',
  VET: 'Veterinaria',
  OTRO: 'Otro',
};
