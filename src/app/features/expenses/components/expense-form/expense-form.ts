import { Component, effect, input, output, signal } from '@angular/core';
import { ExpenseModel } from '../../interfaces/expense-model';
import { CATEGORY_LABELS, CATEGORY_VALUES } from '../../../../shared/constants/expense.constants';
import { CreateExpenseDto } from '../../interfaces/expense-dto';

@Component({
  selector: 'expense-form',
  imports: [],
  templateUrl: './expense-form.html',
})
export class ExpenseForm {
  expense = input<ExpenseModel | null>(null);
  save = output<CreateExpenseDto>();
  cancel = output<void>();

  categories = CATEGORY_VALUES;
  categoryLabels = CATEGORY_LABELS;

  form = signal<CreateExpenseDto>({
    category: 'OTRO',
    title: '',
    description: '',
    amount: 0,
    currency: 'ARS',
    expenseDate: new Date(),
  });

  constructor() {
    effect(() => {
      const exp = this.expense();

      if (exp) {
        this.form.set({
          category: exp.category,
          title: exp.title,
          description: exp.description,
          amount: exp.amount,
          currency: exp.currency,
          expenseDate: exp.expenseDate,
        });
      } else {
        this.form.set({
          category: 'OTRO',
          title: '',
          description: '',
          amount: 0,
          currency: 'ARS',
          expenseDate: new Date(),
        });
      }
    });
  }

  // HANDLERS
  updateField<K extends keyof CreateExpenseDto>(field: K, value: ExpenseModel[K]) {
    this.form.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  onSubmit() {
    const value = this.form();
    if (!value.title.trim()) return;

    this.save.emit(value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
