import { Component, inject, signal } from '@angular/core';
import { SettingsStateService } from '../../core/services/settings-state';

@Component({
  selector: 'settings',
  imports: [],
  templateUrl: './settings.html',
})
export default class Settings {
  columnsCount = signal(3);
  private settingsState = inject(SettingsStateService);
  columns = this.settingsState.columnsNames;
}
