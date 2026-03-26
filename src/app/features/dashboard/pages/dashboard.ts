import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { StatCard } from '../components/stats-cards/stat-card';
import { ExpenseStateService } from '../../../core/services/expense-state';

@Component({
  selector: 'dashboard',
  imports: [StatCard, RouterOutlet],
  templateUrl: './dashboard.html',
})
export default class Dashboard {
  expenseState = inject(ExpenseStateService);
  total = this.expenseState.total;
  amount = this.expenseState.amount;
}
