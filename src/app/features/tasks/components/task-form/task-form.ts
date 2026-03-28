import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'task-form',
  imports: [],
  templateUrl: './task-form.html',
})
export class TaskForm {
  columnId = input.required<string>();

  taskCreated = output<{
    content: string;
    columnId: string;
  }>();

  title = signal('');

  onSubmit() {
    const value = this.title();
    if (!value.trim()) return;

    this.taskCreated.emit({
      content: value,
      columnId: this.columnId(),
    });
  }
}
