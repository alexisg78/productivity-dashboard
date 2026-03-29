import { Injectable, computed, effect, signal } from '@angular/core';
import { ExpenseModel } from '../../features/expenses/interfaces/expense-model';

const STORAGE_KEY = 'expense';

const initialData: ExpenseModel[] = [
  {
    id: 1,
    category: 'VET',
    title: 'Medicamento 1',
    description: 'Analgésico',
    amount: 1,
    currency: 24499,
  },
  {
    id: 2,
    category: 'VET',
    title: 'Medicamento 2',
    description: 'Vitaminas',
    amount: 1,
    currency: 15000,
  },
  {
    id: 3,
    category: 'VET',
    title: 'Medicamento 3',
    description: 'Rogastril',
    amount: 1,
    currency: 20000,
  },
  {
    id: 4,
    category: 'VET',
    title: 'Medicamento 4',
    description: 'Lactulón',
    amount: 1,
    currency: 10000,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ExpenseStateService {
  private expenses = signal<ExpenseModel[]>([]);

  expensesReadonly = this.expenses.asReadonly();

  total = computed(() => this.expenses().reduce((acc, e) => acc + e.currency, 0));

  amount = computed(() => this.expenses().length);

  lastId = computed(() => {
    const list = this.expenses();
    if (!list.length) return 1;
    return Math.max(...list.map((e) => e.id)) + 1;
  });

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);

    this.expenses.set(this.loadFromStorage());

    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.expenses()));
    });
  }

  add(expense: ExpenseModel) {
    const exists = this.expenses().some((e) => e.id === expense.id);

    if (exists) {
      this.expenses.update((list) => list.map((e) => (e.id === expense.id ? expense : e)));
      return;
    }

    this.expenses.update((list) => [
      ...list,
      {
        ...expense,
        id: this.lastId(),
      },
    ]);
  }

  delete(id: number) {
    this.expenses.update((list) => list.filter((e) => e.id !== id));
  }

  loadFromStorage(): ExpenseModel[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  }
}
