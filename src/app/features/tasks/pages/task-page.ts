import { Component, computed, signal } from '@angular/core';
import { TaskListModel } from '../interfaces/task-list-model';
import { TaskList } from '../components/task-list/task-list';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'task-page',
  imports: [TaskList],
  templateUrl: './task-page.html',
})
export default class TaskPage {
  list = signal<TaskListModel[]>([
    {
      id: 'todo',
      title: 'Pendientes',
      status: 'todo',
      tasks: [
        { id: 1, content: 'Delete all references from the wiki', status: 'todo' },
        { id: 2, content: 'Remove analytics code', status: 'todo' },
      ],
    },
    { id: 'in-progress', title: 'En progreso', status: 'in-progress', tasks: [] },
    {
      id: 'done',
      title: 'Realizadas',
      status: 'done',
      tasks: [
        { id: 3, content: 'fix bugs', status: 'done' },
        { id: 4, content: 'Refactoring analytics code', status: 'done' },
      ],
    },
  ]);

  // Crear listas conectadas - permite mover tarjetas entre columnas.
  connectedLists = computed(() => this.list().map((l) => l.id));

  // Handler principal del drag - corazon del sistema
  handleDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedTask = event.container.data[event.currentIndex];

      movedTask.status = event.container.id;
    }

    this.list.update((list) => [...list]);
  }
}
