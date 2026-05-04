export type ColumnId = 'todo' | 'in-progress' | 'done';

type Column = { id: ColumnId; name: string };

export const DEFAULT_COLUMNS: Column[] = [
  { id: 'todo', name: 'Pendientes' },
  { id: 'in-progress', name: 'En progreso' },
  { id: 'done', name: 'Realizadas' },
];
