import { DescriptionProps } from "../types"

export const Description = (props: DescriptionProps) => {
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

