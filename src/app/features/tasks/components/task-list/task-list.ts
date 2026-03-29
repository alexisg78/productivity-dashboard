import { Component, computed, input, output, signal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskListModel } from '../../interfaces/task-list-model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../interfaces/task-model';

@Component({
  selector: 'task-list',
  imports: [TaskCard, DragDropModule],
  templateUrl: './task-list.html',
})
export class TaskList {
  list = input<TaskListModel[]>([]);
  connectedLists = input<string[]>([]);
  taskDropped = output<CdkDragDrop<any>>();
  addTask = output<string>();

  deleteTask = output<number>();
  editTask = output<TaskModel>();
}
