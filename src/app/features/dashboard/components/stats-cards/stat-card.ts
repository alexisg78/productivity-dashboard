import { Component } from '@angular/core';
import { StatsCardModel } from '../../interfaces/stat-card-model';

@Component({
  selector: 'stats-cards',
  imports: [],
  templateUrl: './stat-card.html',
})
export class StatCard {
  stats: StatsCardModel[] = [
    { icon: 'fa-solid fa-clipboard-check', value: 1257, label: '% Tareas completadas' },
    { icon: 'fa-regular fa-chart-bar', value: 557, label: 'Tareas en progreso' },
    { icon: 'fa-solid fa-chart-line', value: '$11,257', label: 'Gastos del mes' },
    { icon: 'fa-solid fa-percent', value: '$75,257', label: 'Promedio por gasto' },
  ];
}
