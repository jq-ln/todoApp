import { ChangeEvent, SyntheticEvent, useState } from "react";

interface ModalFormProps {
  handleSubmit: (event: SyntheticEvent<Element, Event>) => void;
  handleChange: (event: ChangeEvent) => void;
  display: "modal display-block" | "modal display-none";
}

type ModalListProps = Pick<ModalFormProps, "handleChange">;


const twoDigitValue = (num: string) => {
  return num.length === 1 ? "0" + num : num;
}


const DayOptions = (props: ModalListProps) => {
  const days = [];

  for (let day = 1; day <= 31; day++) {
    days.push(String(day));
  }

  return (
    <select id="due_day" name="day" onChange={props.handleChange}>
      <option>Day</option>
      {days.map(day => {
        const value = twoDigitValue(day);

        return (
          <option key={"day" + day} value={value}>{day}</option>
        )
      })}
    </select>
  );
}

const MonthOptions = (props: ModalListProps) => {
  const months = ["January", "February", "March",
                  "April",   "May",      "June",
                  "July",    "August",   "September",
                  "October", "November", "December"];

  return (
    <select id="due_month" name="month" onChange={props.handleChange}>
      <option>Month</option>
      {months.map((month, idx) => {
        const value = twoDigitValue(String(idx + 1))

        return (
          <option key={"month" + (idx + 1)} value={value}>{month}</option>
        );
      })}
    </select>
  );
}

const YearOptions = (props: ModalListProps) => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  return (
    <select id="due_year" name="year" onChange={props.handleChange}>
      <option>Year</option>
      {years.map((year) => {
        return (
          <option key={"year" + year}>{year}</option>
        )
      })}
    </select>
  );
}

const DueDate = (props: ModalListProps) => {
  return (
    <>
      <label htmlFor="due">Due Date</label>
      <div className="date">
        <DayOptions handleChange={props.handleChange} />
        /
        <MonthOptions handleChange={props.handleChange} />
        /
        <YearOptions handleChange={props.handleChange} />
      </div>
    </>
  );
}

const Title = (props: ModalListProps) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" placeholder="Item 1" onChange={props.handleChange} />
    </>
  );
}

const Description = (props: ModalListProps) => {
  return (
    <>
      <label htmlFor="description">Description</label>
      <textarea
        cols={40}
        rows={7}
        id="description"
        name="description"
        placeholder="Description..."
        onChange={props.handleChange}
        ></textarea>
    </>
  )
}

const ModalList = (props: ModalListProps) => {
  return (
    <ul>
      <li>
        <Title handleChange={props.handleChange} />
      </li>
      <li>
        <DueDate handleChange={props.handleChange} />
      </li>
      <li>
        <Description handleChange={props.handleChange} />
      </li>
    </ul>
  );
}

const ModalForm = (props: ModalFormProps) => {
  return (
    <form className={props.display} action="" method="post" onSubmit={props.handleSubmit}>
      <fieldset className="modal-main">
        <ModalList handleChange={props.handleChange} />

        <div className="modal-buttons">
          <input type="submit" value="Save" />
          <button name="complete">Mark As Complete</button>
        </div>
      </fieldset>
    </form>
  );
}

export const Modal = (props: any) => {
  const [formData, setFormData] = useState({
    title: "",
    day: "",
    month: "",
    year: "",
    description: "",
    completed: false,
  });

  const display = props.display ? "modal display-block" : "modal display-none";

  const handleChange = (event: ChangeEvent) => {
    const target = event.target;

    if ("name" in target                 &&
        typeof target.name === "string"  &&
        "value" in target                &&
        typeof target.value === "string"
       ) {
      const [name, value] = [target.name, target.value]
      const updated: any = {};
      updated[name] = value;

      setFormData({...formData, ...updated});
    } else {
      throw new Error("Invalid target type");
    }
  }

  const handleSubmit = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    props.handleSubmit(formData);
  }

  return (
    <div>
      <ModalForm handleSubmit={handleSubmit} handleChange={handleChange} display={display} />
    </div>
  );
}

