import { useState } from "react";

const DayOptions = (props: any) => {
  const days = [];

  for (let day = 1; day <= 31; day++) {
    days.push(String(day));
  }

  return (
    <select id="due_day" name="day" onChange={props.handleChange}>
      <option>Day</option>
      {days.map(day => {
        return (
          <option key={"day" + day} value={day}>{day}</option>
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
        return (
          <option key={"month" + (idx + 1)} value={month}>{month}</option>
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
          <option key={"year" + year}>{year}</option>
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
        <DayOptions handleChange={props.handleChange} />
        /
        <MonthOptions handleChange={props.handleChange} />
        /
        <YearOptions handleChange={props.handleChange} />
      </div>
    </>
  );
}

const Title = (props: any) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" placeholder="Item 1" onChange={props.handleChange} />
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
        ></textarea>
    </>
  )
}

const List = (props: any) => {
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

const ModalForm = (props: any) => {
  return (
    <form className={props.display} action="" method="post" onSubmit={props.handleSubmit}>
      <fieldset className="modal-main">
        <List handleChange={props.handleChange} />

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
  });

  const display = props.display ? "modal display-block" : "modal display-none";

  const handleChange = (event: any) => {
    const [name, value] = [event.target.name, event.target.value]
    const updated: any = {};
    updated[name] = value;
    setFormData({...formData, ...updated});
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <ModalForm handleSubmit={handleSubmit} handleChange={handleChange} display={display} />
    </div>
  );
}

