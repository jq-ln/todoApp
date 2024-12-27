export interface TodoType {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  description?: string;
  completed: boolean;
}

export type FormDataType = Omit<TodoType, "id">;

