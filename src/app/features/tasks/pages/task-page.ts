import { Component, inject, signal } from '@angular/core';
import { TaskStateService } from '../../../core/services/task-state';
import { TaskModel } from '../interfaces/task-model';
import { TaskList } from '../components/task-list/task-list';
import { Modal } from '../../../shared/components/modal/modal';
import { TaskForm } from '../components/task-form/task-form';

@Component({
  selector: 'task-page',
  imports: [TaskList, Modal, TaskForm],
  templateUrl: './task-page.html',
})
export default class TaskPage {
  private taskState = inject(TaskStateService);

  list = this.taskState.listReadonly;
  connectedLists = this.taskState.connectedLists;
  selectedColumnId = signal<string | null>(null);
  selectedTask = signal<TaskModel | null>(null);
  showTaskModal = signal(false);

  openAddTaskModal(columnId: string) {
    this.selectedColumnId.set(columnId);
    this.selectedTask.set(null);
    this.showTaskModal.set(true);
  }

  createTask(event: any) {
    this.taskState.createTask(event.content, event.columnId);

    this.showTaskModal.set(false);
  }

  updateTask(event: any) {
    this.taskState.updateTask(event.id, event.content, event.columnId);

    this.showTaskModal.set(false);
  }

  deleteTask(taskId: number) {
    this.taskState.deleteTask(taskId);
  }

  handleDrop(event: any) {
    this.taskState.handleDrop(event);
  }

  openEditModal(task: TaskModel) {
    this.selectedTask.set(task);
    this.selectedColumnId.set(task.status);
    this.showTaskModal.set(true);
  }
}
