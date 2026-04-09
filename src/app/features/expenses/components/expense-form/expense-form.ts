import { Component, effect, input, output, signal } from '@angular/core';
import { ExpenseModel } from '../../interfaces/expense-model';
import { CATEGORY_LABELS, CATEGORY_VALUES } from '../../../../shared/constants/expense.constants';

@Component({
  selector: 'expense-form',
  imports: [],
  templateUrl: './expense-form.html',
})
export class ExpenseForm {
  expense = input<ExpenseModel | null>(null);
  last_id = input(0);
  save = output<ExpenseModel>();
  cancel = output<void>();

  categories = CATEGORY_VALUES;
  categoryLabels = CATEGORY_LABELS;

  form = signal<ExpenseModel>({
    id: 0,
    category: 'OTRO',
    title: '',
    description: '',
    amount: 0,
    currency: 'ARS',
  });

  constructor() {
    effect(() => {
      const exp = this.expense();

      if (exp) {
        this.form.set({ ...exp });
      } else {
        this.form.set({
          id: this.last_id(),
          category: 'OTRO',
          title: '',
          description: '',
          amount: 0,
          currency: 'ARS',
        });
      }
    });
  }

  // HANDLERS
  updateField<K extends keyof ExpenseModel>(field: K, value: ExpenseModel[K]) {
    this.form.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  onSubmit() {
    const value = this.form();
    if (!value.title.trim()) return;

    this.save.emit({
      ...value,
      id: value.id || this.last_id(),
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
