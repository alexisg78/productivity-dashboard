export interface TableColumn<T = any> {
  field: keyof T;
  header: string;
  class?: string;
}
