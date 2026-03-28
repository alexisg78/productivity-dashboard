import { Component, computed, input, output, signal } from '@angular/core';
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
  addTask = output<string>();

  showModal = signal(false);
  selectedListId = signal<string | null>(null);

  openAddTaskModal(listId: string) {
    this.selectedListId.set(listId);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  taskCreated = output<{
    title: string;
    listId: string;
  }>();

  onTaskCreated(task: { title: string; listId: string }) {
    this.taskCreated.emit(task);

    this.closeModal();
  }
}
