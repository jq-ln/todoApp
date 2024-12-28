import { DateOptionProps } from "../types";

const toTwoDigitValue = (num: string) => {
  return num.length === 1 ? "0" + num : num;
}

export const DayOptions = (props: DateOptionProps) => {
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

export const MonthOptions = (props: DateOptionProps) => {
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

export const YearOptions = (props: DateOptionProps) => {
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

