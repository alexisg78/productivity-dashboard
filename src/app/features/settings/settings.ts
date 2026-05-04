import { Component, effect, inject, signal } from '@angular/core';
import { SettingsStateService } from '../../core/services/settings-state';

@Component({
  selector: 'settings',
  imports: [],
  templateUrl: './settings.html',
})
export default class Settings {
  private settingsState = inject(SettingsStateService);
  columns = this.settingsState.columns;

  updateColumnName(index: number, value: string) {
    const updated = [...this.columns()];
    updated[index] = { ...updated[index], name: value };

    this.settingsState.columns.set(updated);
  }

  cantColumns() {
    return this.columns().length;
  }
}
