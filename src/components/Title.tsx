export const Title = (props: any) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" placeholder={"Item 1"} value={props.title} onChange={props.handleChange} />
    </>
  );
}

