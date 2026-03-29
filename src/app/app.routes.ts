import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/components/dashboard-overview/dashboard-overview'),
      },
      {
        path: 'expenses',
        loadComponent: () => import('./features/expenses/pages/expense-list/expense-list'),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./features/tasks/pages/task-page'),
      },
    ],
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
