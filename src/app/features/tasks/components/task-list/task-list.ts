import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskListModel } from '../../interfaces/task-list-model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../interfaces/task-model';
import { TaskStateService } from '../../../../core/services/task-state';

@Component({
  selector: 'task-list',
  imports: [TaskCard, DragDropModule],
  templateUrl: './task-list.html',
})
export class TaskList {
  taskState = inject(TaskStateService);
  list = input<TaskListModel[]>([]);
  connectedLists = input<string[]>([]);
  taskDropped = output<CdkDragDrop<any>>();
  addTask = output<string>();

  deleteTask = output<number>();
  editTask = output<TaskModel>();
}
