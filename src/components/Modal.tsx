import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface ModalFormProps {
  display: "modal display-block" | "modal display-none";
  handleSubmit: (event: SyntheticEvent<Element, Event>) => void;
  handleChange: (event: ChangeEvent) => void;
}

type ModalListProps = Pick<ModalFormProps, "handleChange">;


const twoDigitValue = (num: string) => {
  return num.length === 1 ? "0" + num : num;
}


const DayOptions = (props: any) => {
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
          <option key={"day" + day} value={value} selected={day === props.day}>{day}</option>
        )
      })}
    </select>
  );
}

const MonthOptions = (props: any) => {
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
          <option key={"month" + (idx + 1)} value={value} selected={value === props.month}>{month}</option>
        );
      })}
    </select>
  );
}

const YearOptions = (props: any) => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  return (
    <select id="due_year" name="year" onChange={props.handleChange}>
      <option>Year</option>
      {years.map((year) => {
        return (
          <option key={"year" + year} selected={year === props.year}>{year}</option>
        )
      })}
    </select>
  );
}

const DueDate = (props: any) => {
  return (
    <>
      <label htmlFor="due">Due Date</label>
      <div className="date">
        <DayOptions day={props.date.day} handleChange={props.handleChange} />
        /
        <MonthOptions month={props.date.month} handleChange={props.handleChange} />
        /
        <YearOptions year={props.date.year} handleChange={props.handleChange} />
      </div>
    </>
  );
}

const Title = (props: any) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" placeholder={"Item 1"} value={props.title} onChange={props.handleChange} />
    </>
  );
}

const Description = (props: any) => {
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
        value={props.description}
        ></textarea>
    </>
  )
}

const ModalList = (props: any) => {
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

const ModalForm = (props: any) => {
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

export const Modal = (props: any) => {
  const [formData, setFormData] = useState(props.formData);
  console.log(formData);

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

