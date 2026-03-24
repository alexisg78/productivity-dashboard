export interface TaskModel {
  id: number;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
}
