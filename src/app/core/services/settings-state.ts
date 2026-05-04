import { Injectable, signal } from '@angular/core';
import { ColumnId, DEFAULT_COLUMNS } from '../../shared/constants/default-column.constant';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService {
  theme = signal<'light' | 'dark'>('dark');

  currency = signal<'ARS' | 'USD'>('ARS');

  sidebarCollapsed = signal(false);

  visibleTasks = signal<string[]>([]);

  columns = signal<{ id: ColumnId; name: string }[]>([...DEFAULT_COLUMNS]);
}
