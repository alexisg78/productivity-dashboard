import { TaskModel } from './task-model';

export interface TaskListModel {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  tasks: TaskModel[];
}
