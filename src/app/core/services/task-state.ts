import { Injectable, computed, effect, signal } from '@angular/core';
import { TaskListModel } from '../../features/tasks/interfaces/task-list-model';
import { TaskModel } from '../../features/tasks/interfaces/task-model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private list = signal<TaskListModel[]>(this.loadFromStorage());

  listReadonly = this.list.asReadonly();

  connectedLists = computed(() => this.list().map((l) => l.id));

  taskStats = computed(() => {
    let inProgress = 0;
    let done = 0;

    for (const list of this.list()) {
      for (const task of list.tasks) {
        if (task.status === 'in-progress') inProgress++;
        if (task.status === 'done') done++;
      }
    }

    return { inProgress, done };
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list()));
    });
  }

  createTask(content: string, columnId: string) {
    this.list.update((lists) =>
      lists.map((list) => {
        if (list.id !== columnId) return list;

        return {
          ...list,
          tasks: [
            ...list.tasks,
            {
              id: Date.now(),
              content,
              status: list.status,
            },
          ],
        };
      }),
    );
  }

  updateTask(id: number, content: string, columnId: string) {
    this.list.update((lists) =>
      lists.map((list) => {
        if (list.id !== columnId) return list;

        return {
          ...list,
          tasks: list.tasks.map((task) => (task.id === id ? { ...task, content } : task)),
        };
      }),
    );
  }

  deleteTask(taskId: number) {
    this.list.update((lists) =>
      lists.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      })),
    );
  }

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

  private loadFromStorage(): TaskListModel[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : initialData;
  }
}
