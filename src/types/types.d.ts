import { PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

export type AddTodoPayload = TodoType;

export type DeleteTodoPayload = {
  id: string;
};

export type ChangeTodoPayload = {
  id: string;
};

export type TodosState = {
  todos: TodoType[];
};

export type TodosAction =
  | PayloadAction<AddTodoPayload>
  | PayloadAction<DeleteTodoPayload>
  | PayloadAction<ChangeTodoPayload>;
