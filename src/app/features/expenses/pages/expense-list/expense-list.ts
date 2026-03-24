import { Component, computed, OnInit, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { TableColumn } from '../../../../shared/interfaces/table-column.interface';
import { TableAction } from '../../../../shared/interfaces/table-action.interface';
import { ExpenseModel } from '../../interfaces/expense-model';
import { Modal } from '../../../../shared/components/modal/modal';
import { ExpenseForm } from '../../components/expense-form/expense-form';

const dataExpenses: ExpenseModel[] = [
  {
    id: 1,
    category: 'Medicamentos',
    title: 'Medicamento 1',
    description: 'Analgésico',
    amount: 1,
    currency: 24499.0,
  },
  {
    id: 2,
    category: 'Medicamentos',
    title: 'Medicamento 2',
    description: 'Vitaminas',
    amount: 1,
    currency: 15000.0,
  },
  {
    id: 3,
    category: 'Medicamentos',
    title: 'Medicamento 3',
    description: 'Rogastril',
    amount: 1,
    currency: 20000.0,
  },
  {
    id: 4,
    category: 'Medicamentos',
    title: 'Medicamento 4',
    description: 'Lactulón',
    amount: 1,
    currency: 10000.0,
  },
];

@Component({
  selector: 'expense-list',
  imports: [Table, Modal, ExpenseForm],
  templateUrl: './expense-list.html',
})
export default class ExpenseList implements OnInit {
  ngOnInit(): void {
    let data = localStorage.getItem('expense');

    if (!data) {
      data = JSON.stringify(this.expenses());
      localStorage.setItem('expense', data);
    }

    this.expenses.set(JSON.parse(data));
  }

  listExpenses: ExpenseModel[] | null = [];
  showModal = signal(false);
  selectedExpense = signal<ExpenseModel | null>(null);
  expenses = signal<ExpenseModel[]>(dataExpenses);

  total = computed(() => this.expenses().reduce((acc, e) => acc + e.currency, 0));

  last_id = computed(() => {
    const list = this.expenses();
    if (!list.length) return 1;
    return Math.max(...list.map((e) => e.id)) + 1;
  });

  columns: TableColumn<ExpenseModel>[] = [
    { field: 'id', header: 'ID', class: 'hidden sm:table-cell md:hidden lg:hidden' },
    { field: 'category', header: 'Categoría' },
    { field: 'title', header: 'Título' },
    { field: 'description', header: 'Descripción', class: 'hidden md:table-cell' },
    { field: 'amount', header: 'Cantidad' },
    { field: 'currency', header: 'Precio' },
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

  editExpense = (expense: ExpenseModel) => {
    this.selectedExpense.set(expense);
    this.showModal.set(true);
  };

  deleteExpense(expense: ExpenseModel) {
    this.expenses.update((current) => current.filter((e) => e.id !== expense.id));
    this.saveToStorage();
  }

  addExpense = () => {
    this.selectedExpense.set(null);
    this.showModal.set(true);
  };

  handleSave(expense: ExpenseModel) {
    this.expenses.update((current) => {
      const exists = current.some((e) => e.id === expense.id);

      if (exists) {
        return current.map((e) => (e.id === expense.id ? expense : e));
      }

      return [...current, expense];
    });

    this.saveToStorage();
    this.showModal.set(false);
  }

  private saveToStorage() {
    localStorage.setItem('expense', JSON.stringify(this.expenses()));
  }

  closeModal() {
    this.showModal.set(false);
  }
}
