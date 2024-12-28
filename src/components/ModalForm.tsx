import { ModalFormProps } from "../types";
import { ModalList } from "./ModalList";

export const ModalForm = (props: ModalFormProps) => {
  return (
    <form className={props.display} action="" method="post" onSubmit={props.handleSubmit}>
      <fieldset className="modal-main">
        <ModalList data={props.data} handleChange={props.handleChange} />

        <div className="modal-buttons">
          <input type="submit" value="Save" />
          <button name="complete">Mark As Complete</button>
        </div>
      </fieldset>
    </form>
  );
}

