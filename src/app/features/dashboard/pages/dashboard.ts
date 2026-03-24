import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { StatCard } from '../components/stats-cards/stat-card';

@Component({
  selector: 'dashboard',
  imports: [StatCard, RouterOutlet],
  templateUrl: './dashboard.html',
})
export default class Dashboard {}
