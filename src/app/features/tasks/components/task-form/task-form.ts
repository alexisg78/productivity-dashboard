import { Component, computed, effect, input, output, signal } from '@angular/core';
import { TaskModel } from '../../interfaces/task-model';

@Component({
  selector: 'task-form',
  imports: [],
  templateUrl: './task-form.html',
})
export class TaskForm {
  columnId = input.required<string>();

  task = input<TaskModel | null>(null);

  title = signal('');

  taskCreated = output<{
    content: string;
    columnId: string;
  }>();

  taskUpdated = output<{
    id: number;
    content: string;
    columnId: string;
  }>();

  isEditMode = computed(() => this.task() !== null);

  constructor() {
    effect(() => {
      const task = this.task();

      if (task) {
        this.title.set(task.content);
      } else {
        this.title.set('');
      }
    });
  }

  onSubmit() {
    const value = this.title();

    if (!value.trim()) return;

    if (this.isEditMode()) {
      this.taskUpdated.emit({
        id: this.task()!.id,
        content: value,
        columnId: this.columnId(),
      });
    } else {
      this.taskCreated.emit({
        content: value,
        columnId: this.columnId(),
      });
    }
  }
}
