import { DayOptions, MonthOptions, YearOptions } from "../components/DateOptions";
import { DueDateProps } from "../types";

export const DueDate = (props: DueDateProps) => {
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

