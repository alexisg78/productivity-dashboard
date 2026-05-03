import { computed, inject, Injectable, signal } from '@angular/core';
import { TaskStateService } from './task-state';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService {
  private taskState = inject(TaskStateService);

  theme = signal<'light' | 'dark'>('dark');

  currency = signal<'ARS' | 'USD'>('ARS');

  sidebarCollapsed = signal(false);

  visibleTasks = signal<string[]>([]);

  columnsNames = computed(() => this.taskState.listReadonly().map((t) => t.title));
}
