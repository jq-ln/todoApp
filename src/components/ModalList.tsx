import { DueDate } from "./DueDate";
import { Title } from "./Title";
import { Description } from "./Description";
import { ModalFormProps } from "../types";

export const ModalList = (props: ModalFormProps) => {
  console.log("ModalList props:", props)
  return (
    <ul>
      <li>
        <Title title={props.data.title} handleChange={props.handleChange} />
      </li>
      <li>
        <DueDate date={{day: props.data.day, month: props.data.month, year: props.data.year}} handleChange={props.handleChange} />
      </li>
      <li>
        <Description description={props.data.description} handleChange={props.handleChange} />
      </li>
    </ul>
  );
}

