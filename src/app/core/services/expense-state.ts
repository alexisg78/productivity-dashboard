import { Injectable, computed, effect, signal } from '@angular/core';
import { ExpenseModel } from '../../features/expenses/interfaces/expense-model';
import { CreateExpenseDto } from '../../features/expenses/interfaces/expense-dto';

const STORAGE_KEY = 'expense';

const initialData: ExpenseModel[] = [
  {
    id: 1,
    category: 'VET',
    title: 'Medicamento 1',
    description: 'Analgésico',
    amount: 24499,
    currency: 'ARS',
    expenseDate: new Date(),
  },
  {
    id: 2,
    category: 'VET',
    title: 'Medicamento 2',
    description: 'Vitaminas',
    amount: 15000,
    currency: 'ARS',
    expenseDate: new Date(),
  },
  {
    id: 3,
    category: 'VET',
    title: 'Medicamento 3',
    description: 'Rogastril',
    amount: 200,
    currency: 'USD',
    expenseDate: new Date(),
  },
  {
    id: 4,
    category: 'VET',
    title: 'Medicamento 4',
    description: 'Lactulón',
    amount: 100,
    currency: 'USD',
    expenseDate: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class ExpenseStateService {
  private expenses = signal<ExpenseModel[]>([]);

  expensesReadonly = this.expenses.asReadonly();

  total = computed(() => this.expenses().reduce((acc, e) => acc + e.amount, 0));

  amount = computed(() => this.expenses().length);

  lastId = computed(() => {
    const list = this.expenses();
    if (!list.length) return 1;
    return Math.max(...list.map((e) => e.id)) + 1;
  });

  constructor() {
    this.expenses.set(this.loadFromStorage());

    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.expenses()));
    });
  }

  create(expense: CreateExpenseDto) {
    const newExpense: ExpenseModel = {
      ...expense,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.expenses.update((list) => [...list, newExpense]);
  }

  update(id: number, changes: Partial<CreateExpenseDto>) {
    this.expenses.update((list) =>
      list.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              ...changes,
              updatedAt: new Date(),
            }
          : exp,
      ),
    );
  }

  delete(id: number) {
    this.expenses.update((list) => list.filter((e) => e.id !== id));
  }

  loadFromStorage(): ExpenseModel[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return initialData;

    const parsed = JSON.parse(stored);

    return parsed.map((e: ExpenseModel) => ({
      ...e,
      expenseDate: new Date(e.expenseDate),
      createdAt: e.createdAt ? new Date(e.createdAt) : undefined,
      updatedAt: e.updatedAt ? new Date(e.updatedAt) : undefined,
    }));
  }

  private generateId(): number {
    const list = this.expenses();

    if (!list.length) return 1;

    return Math.max(...list.map((e) => e.id)) + 1;
  }
}
