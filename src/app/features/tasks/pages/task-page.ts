import { Component, computed, effect, signal } from '@angular/core';
import { TaskListModel } from '../interfaces/task-list-model';
import { TaskList } from '../components/task-list/task-list';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Modal } from '../../../shared/components/modal/modal';
import { TaskForm } from '../components/task-form/task-form';

const STORAGE_KEY = 'task';

const initialData: TaskListModel[] = [
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
];

@Component({
  selector: 'task-page',
  imports: [TaskList, Modal, TaskForm],
  templateUrl: './task-page.html',
})
export default class TaskPage {
  selectedColumnId = signal<string | null>(null);
  showTaskModal = signal(false);

  list = signal<TaskListModel[]>([]);

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);

    this.list.set(this.loadFromStorage());

    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list()));
    });
  }

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

  // Abre modal para Agregar tarea a la columna
  openAddTaskModal(columnId: string) {
    this.selectedColumnId.set(columnId);
    this.showTaskModal.set(true);
  }

  createTask(event: { content: string; columnId: string }) {
    this.list.update((lists) =>
      lists.map((list) => {
        if (list.id !== event.columnId) return list;

        return {
          ...list,
          tasks: [
            ...list.tasks,
            {
              id: Date.now(),
              content: event.content,
              status: list.status,
            },
          ],
        };
      }),
    );

    this.showTaskModal.set(false);
  }

  loadFromStorage(): TaskListModel[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  }
}
