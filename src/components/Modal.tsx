import { ChangeEvent, SyntheticEvent, useState } from "react";
import { ModalProps } from "../types";
import { ModalForm } from "./ModalForm";

export const Modal = (props: ModalProps) => {
  const [formData, setFormData] = useState(props.formData);

  const handleChange = (event: ChangeEvent) => {
    const target = event.target;

    if ("name" in target                 &&
        typeof target.name === "string"  &&
        "value" in target                &&
        typeof target.value === "string"
       ) {
      const [name, value] = [target.name, target.value]
      const updated: {[key: string]: string} = {};
      updated[name] = value;

      setFormData({...formData, ...updated});
    } else {
      throw new Error("Invalid target type");
    }
  }

  const handleSubmit = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    if (formData.title && formData.title.length >= 3) {
      props.handleSubmit(formData);
    } else {
      alert("You must enter a title at least three characters long");
    }
  }

  return (
    <div>
      <ModalForm
        data={formData}
        display={props.display ? "modal display-block" : "modal display-none"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}

