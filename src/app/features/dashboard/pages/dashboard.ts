import { Component, inject } from '@angular/core';
import { StatCard } from '../components/stats-cards/stat-card';
import { ExpenseStateService } from '../../../core/services/expense-state';
import DashboardOverview from '../components/dashboard-overview/dashboard-overview';

@Component({
  selector: 'dashboard',
  imports: [StatCard, DashboardOverview],
  templateUrl: './dashboard.html',
})
export default class Dashboard {
  expenseState = inject(ExpenseStateService);
  total = this.expenseState.total;
  amount = this.expenseState.amount;
}
