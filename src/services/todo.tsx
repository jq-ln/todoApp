import axios from "axios";
import { FormDataType } from "../types";

const baseUrl = "http://localhost:3000/api"

export const getTodos = async () => {
  return await axios.get(baseUrl + "/todos")
    .then((response) => {
      return response.data;
  })
}

export const updateTodo = async (id: number, updateValues: Partial<FormDataType>) => {
  return await axios.put(baseUrl + "/todos/" + id, updateValues)
    .then(response => {
      return response.data;
    });
}

export const addTodo = async (todo: FormDataType) => {
  await axios.post(baseUrl + "/todos", todo)
}

export const deleteTodo = async (id: number) => {
  await axios.delete(baseUrl + "/todos/" + id);
}
