import { Component, effect, input, output, signal } from '@angular/core';
import { ExpenseModel } from '../../interfaces/expense-model';

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

  form = signal<ExpenseModel>({
    id: 0,
    category: 'Seleccione una opción',
    title: '',
    description: '',
    amount: 1,
    currency: 0,
  });

  ngOnInit() {
    if (this.expense()) {
      this.form.set({ ...this.expense()! });
    }
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
