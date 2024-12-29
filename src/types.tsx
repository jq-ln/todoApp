import { SyntheticEvent, ChangeEvent } from "react";

//--------------------------------------------------
// => Todo Types
//--------------------------------------------------

export interface TodoType {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  description?: string;
  completed: boolean;
}

//--------------------------------------------------
// => Modal Types
//--------------------------------------------------

export type FormDataType = Omit<TodoType, "id">;

type HandleChange = (event: ChangeEvent) => void;

interface IncludesChange {
  handleChange: HandleChange;
}

export interface ModalProps {
  display: boolean;
  formData: FormDataType;
  handleSubmit: (todo: FormDataType) => void;
}

export interface ModalFormProps extends IncludesChange {
  data: FormDataType;
  display: "modal display-block" | "modal display-none";
  handleSubmit: (event: SyntheticEvent<Element, Event>) => void;
}

export type ModalListProps = Omit<ModalFormProps, "display" | "handleSubmit">;

export interface TitleProps extends IncludesChange {
  title: string;
}

interface Date {
  day: string;
  month: string;
  year: string;
}

export type DateOptionProps = Partial<Date> & IncludesChange;

export interface DueDateProps extends IncludesChange {
  date: Date;
}

export interface DescriptionProps extends IncludesChange {
  description: string;
}

