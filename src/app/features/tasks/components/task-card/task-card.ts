import { Component, input, output } from '@angular/core';
import { TaskModel } from '../../interfaces/task-model';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'task-card',
  imports: [DragDropModule],
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<TaskModel>();
  edit = output<TaskModel>();
  delete = output<number>();
}
