import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AddTodoPayload,
  ChangeTodoPayload,
  DeleteTodoPayload,
  TodoType,
  TodosState,
} from "../../types/types";
import { v4 as uuidv4 } from "uuid";

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<AddTodoPayload>) => {
      const newTodo: TodoType = {
        ...action.payload,
        isDone: false,
        id: uuidv4(),
      };
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<DeleteTodoPayload>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    changeTodo: (state, action: PayloadAction<ChangeTodoPayload>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
  },
});

export const { addTodos, deleteTodo, changeTodo } = todosSlice.actions;
export default todosSlice.reducer;
