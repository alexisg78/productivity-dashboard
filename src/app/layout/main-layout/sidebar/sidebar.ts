import { Component } from '@angular/core';
import { SidebarItem } from './interfaces/sidebar-Item.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  menuItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard',
      section: 'main',
    },
    {
      label: 'Gastos',
      icon: 'fa-solid fa-receipt',
      route: '/dashboard/expenses',
      section: 'main',
    },
    {
      label: 'Tareas',
      icon: 'fa-solid fa-list-check',
      route: '/dashboard/tasks',
      section: 'main',
    },
    {
      label: 'Perfil',
      icon: 'fa-solid fa-user',
      route: '/dashboard/profile',
      section: 'setting',
    },
    {
      label: 'Configuraciones',
      icon: 'fa-solid fa-gear',
      route: '/settings',
      section: 'setting',
    },
  ];
}
