import { Component, computed, input, output } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskListModel } from '../../interfaces/task-list-model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'task-list',
  imports: [TaskCard, DragDropModule],
  templateUrl: './task-list.html',
})
export class TaskList {
  list = input<TaskListModel[]>([]);
  connectedLists = input<string[]>([]);
  taskDropped = output<CdkDragDrop<any>>();
  addCard = output<string>();
}
