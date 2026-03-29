import { Component } from '@angular/core';
import ExpenseList from '../../../expenses/pages/expense-list/expense-list';
import TaskPage from '../../../tasks/pages/task-page';

@Component({
  selector: 'dashboard-overview',
  imports: [ExpenseList, TaskPage],
  templateUrl: './dashboard-overview.html',
})
export default class DashboardOverview {}
