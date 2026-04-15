import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard'),
  },

  {
    path: 'expenses',
    loadComponent: () => import('./features/expenses/pages/expense-list/expense-list'),
  },

  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/pages/task-page'),
  },

  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings'),
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
