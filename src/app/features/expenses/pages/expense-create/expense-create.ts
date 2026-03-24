import { Component } from '@angular/core';
import { ExpenseForm } from '../../components/expense-form/expense-form';

@Component({
  selector: 'expense-create',
  imports: [ExpenseForm],
  templateUrl: './expense-create.html',
})
export default class ExpenseCreate {}
