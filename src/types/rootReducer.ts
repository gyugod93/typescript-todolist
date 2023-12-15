import { combineReducers } from "@reduxjs/toolkit";
import { TodosState } from "./types";
import todoReducer from "../redux/modules/todosSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = {
  todos: TodosState;
};

export default rootReducer;
