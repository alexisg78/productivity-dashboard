import { Component, computed, inject, input, signal } from '@angular/core';
import { StatsCardModel } from '../../interfaces/stat-card-model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'stats-cards',
  imports: [CurrencyPipe],
  templateUrl: './stat-card.html',
})
export class StatCard {
  stats = computed<StatsCardModel[]>(() => [
    {
      icon: 'fa-solid fa-clipboard-check',
      value: 1257,
      label: '% Tareas completadas',
      category: 'Task',
    },
    { icon: 'fa-regular fa-chart-bar', value: 557, label: 'Tareas en progreso', category: 'Task' },
    { icon: 'fa-solid fa-chart-line', value: this.expenseValue(), label: 'Gastos del mes' },
    { icon: 'fa-solid fa-percent', value: this.prom(), label: 'Promedio por gasto' },
  ]);

  expenseValue = input<number>(0);
  expenseAmount = input<number>(0);
  prom = computed(() => this.expenseValue() / this.expenseAmount());
}
