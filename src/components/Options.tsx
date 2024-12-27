const toTwoDigitValue = (num: string) => {
  return num.length === 1 ? "0" + num : num;
}

const DayOptions = (props: any) => {
  const days = [];

  for (let day = 1; day <= 31; day++) {
    days.push(String(day));
  }

  return (
    <select value={props.day} id="due_day" name="day" onChange={props.handleChange}>
      <option value="DD">Day</option>
      {days.map(day => {
        const value = toTwoDigitValue(day);

        return (
          <option key={"day" + day} value={value}>{day}</option>
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
    <select value={props.month} id="due_month" name="month" onChange={props.handleChange}>
      <option value="MM">Month</option>
      {months.map((month, idx) => {
        const value = toTwoDigitValue(String(idx + 1))

        return (
          <option key={"month" + (idx + 1)} value={value}>{month}</option>
        );
      })}
    </select>
  );
}

const YearOptions = (props: any) => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  return (
    <select value={props.year} id="due_year" name="year" onChange={props.handleChange}>
      <option value="YYYY">Year</option>
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

export const ModalList = (props: any) => {
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

