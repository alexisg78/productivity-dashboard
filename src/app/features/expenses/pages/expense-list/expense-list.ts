import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { TableColumn } from '../../../../shared/interfaces/table-column.interface';
import { TableAction } from '../../../../shared/interfaces/table-action.interface';
import { ExpenseModel } from '../../interfaces/expense-model';
import { Modal } from '../../../../shared/components/modal/modal';
import { ExpenseForm } from '../../components/expense-form/expense-form';
import { ExpenseStateService } from '../../../../core/services/expense-state';

@Component({
  selector: 'expense-list',
  imports: [Table, Modal, ExpenseForm],
  templateUrl: './expense-list.html',
})
export default class ExpenseList {
  private expenseState = inject(ExpenseStateService);

  columns: TableColumn<ExpenseModel>[] = [
    { field: 'id', header: 'ID', class: 'hidden sm:table-cell md:hidden lg:hidden' },
    { field: 'category', header: 'Categoría' },
    { field: 'title', header: 'Título' },
    { field: 'description', header: 'Descripción', class: 'hidden md:table-cell' },
    { field: 'amount', header: 'Precio' },
    { field: 'currency', header: 'Moneda' },
  ];

  actions: TableAction<ExpenseModel>[] = [
    {
      label: 'Editar',
      icon: 'fa-solid fa-pen-to-square',
      class: 'text-blue-500 hover:text-blue-700',
      action: (row) => this.editExpense(row),
    },
    {
      label: 'Eliminar',
      icon: 'fa-solid fa-trash-can',
      class: 'text-red-500 hover:text-red-700',
      action: (row) => this.deleteExpense(row),
    },
  ];

  expenses = this.expenseState.expensesReadonly;

  showModal = signal(false);

  selectedExpense = signal<ExpenseModel | null>(null);

  editExpense = (expense: ExpenseModel) => {
    this.selectedExpense.set(expense);

    this.showModal.set(true);
  };

  deleteExpense(expense: ExpenseModel) {
    this.expenseState.delete(expense.id);
  }

  addExpense = () => {
    this.selectedExpense.set(null);

    this.showModal.set(true);
  };

  handleSave(expense: ExpenseModel) {
    this.expenseState.add(expense);

    this.showModal.set(false);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
