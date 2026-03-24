export interface TableAction<T = any> {
  label?: string;
  icon?: string;
  action: (row: T) => void;
  show?: (row: T) => boolean;
  class?: string; // clase de tailwind
}
