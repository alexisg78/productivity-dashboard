import { Component, effect, input, output, signal } from '@angular/core';
import { ExpenseModel } from '../../interfaces/expense-model';
import { CATEGORY_LABELS, CATEGORY_VALUES } from '../../../../shared/constants/expense.constants';
import { CreateExpenseDto } from '../../interfaces/expense-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'expense-form',
  imports: [DatePipe],
  templateUrl: './expense-form.html',
})
export class ExpenseForm {
  expense = input<ExpenseModel | null>(null);
  save = output<CreateExpenseDto>();
  cancel = output<void>();

  categories = CATEGORY_VALUES;
  categoryLabels = CATEGORY_LABELS;

  form = signal<CreateExpenseDto>({
    category: 'SERV',
    title: '',
    description: '',
    amount: 0,
    currency: 'ARS',
    expenseDate: new Date(new Date().toISOString().split('T')[0]), // hacer que la fecha default sea hoy en formato local correcto
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
          category: 'SERV',
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

  onDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.updateField(
      'expenseDate',
      value
        ? new Date(value + 'T00:00:00') // evita problemas de timezone
        : new Date(),
    );
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
