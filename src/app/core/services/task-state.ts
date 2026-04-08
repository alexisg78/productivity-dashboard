import { Injectable, computed, effect, signal } from '@angular/core';
import { TaskListModel } from '../../features/tasks/interfaces/task-list-model';
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

    let tasks = this.list().flatMap((l) => l.tasks);
    let countList = tasks.length;

    for (const list of this.list()) {
      for (const task of list.tasks) {
        if (task.status === 'in-progress') inProgress++;
        if (task.status === 'done') done++;
      }
    }

    const doneCount = done;
    done = countList === 0 ? 0 : Math.round((doneCount / countList) * 100);
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

  restartTask() {
    this.list.update((lists: TaskListModel[]): TaskListModel[] => {
      const doneColumn = lists.find((l) => l.id === 'done');
      if (!doneColumn) return lists;

      const doneTasks = doneColumn.tasks.map((task) => ({
        ...task,
        status: 'todo' as const,
      }));

      return lists.map((list): TaskListModel => {
        if (list.id === 'done') {
          return {
            ...list,
            tasks: [],
          };
        }

        if (list.id === 'todo') {
          return {
            ...list,
            tasks: [...doneTasks, ...list.tasks],
          };
        }

        return list;
      });
    });
  }
}
