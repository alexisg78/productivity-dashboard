import { Component, input } from '@angular/core';
import { Pagination } from './pagination/pagination';
import { TableColumn } from '../../interfaces/table-column.interface';
import { TableAction } from '../../interfaces/table-action.interface';

@Component({
  selector: 'custom-table',
  imports: [Pagination],
  templateUrl: './table.html',
})
export class Table<T = any> {
  columns = input<TableColumn<T>[]>([]);
  data = input<T[]>([]);
  actions = input<TableAction<T>[]>([]);
  showFooter = input(true);
  showAddButton = input(true);
  total = input<number | null>(null);
  onAdd = input<(() => void) | null>(null);

  handleAdd() {
    this.onAdd()?.();
  }
}
