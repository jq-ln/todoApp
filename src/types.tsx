import { SyntheticEvent, ChangeEvent } from "react";

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

export interface ModalProps {
  display: boolean;
  formData: FormDataType;
  handleSubmit: (todo: FormDataType) => void;
}

export interface ModalFormProps {
  data: FormDataType;
  display: "modal display-block" | "modal display-none";
  handleSubmit: (event: SyntheticEvent<Element, Event>) => void;
  handleChange: (event: ChangeEvent) => void;
}

export type ModalListProps = Pick<ModalFormProps, "handleChange">;


