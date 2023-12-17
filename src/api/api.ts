import axios from "axios";
import { AddTodoPayload, ChangeTodoPayload, TodoType } from "../types/types";

const SERVER_URI = "http://localhost:4000";

const getTodos = async (): Promise<TodoType[]> => {
  const response = await axios.get<TodoType[]>(`${SERVER_URI}/todos`);
  return response.data;
};

const addTodo = async (newTodo: AddTodoPayload): Promise<void> => {
  await axios.post(`${SERVER_URI}/todos`, newTodo);
};

const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${SERVER_URI}/todos/${id}`);
};

const changeTodo = async (payload: ChangeTodoPayload): Promise<void> => {
  await axios.patch(`${SERVER_URI}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, deleteTodo, changeTodo };
