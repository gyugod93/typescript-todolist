import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddTodoPayload,
  ChangeTodoPayload,
  DeleteTodoPayload,
  TodoType,
  TodosState,
} from "../../types/types";
import jsonServerAPI from "../../api/api";

export const __getTodos = createAsyncThunk<
  TodoType[],
  void,
  { rejectValue: Error }
>("todos/getTodos", async (payload, thunkAPI) => {
  try {
    const data = await jsonServerAPI.get("/todos");
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error as Error);
  }
});

export const __addTodos = createAsyncThunk<TodoType, AddTodoPayload>(
  "todos/addTodos",
  async (payload: AddTodoPayload, thunkAPI) => {
    try {
      const data = await jsonServerAPI.post("/todos", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk<
  DeleteTodoPayload,
  DeleteTodoPayload
>("todos/deleteTodo", async (payload: DeleteTodoPayload, thunkAPI) => {
  try {
    await jsonServerAPI.delete(`/todos/${payload.id}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __changeTodo = createAsyncThunk<TodoType, ChangeTodoPayload>(
  "todos/changeTodo",
  async (payload: ChangeTodoPayload, thunkAPI) => {
    try {
      const data = await jsonServerAPI.patch(`todos/${payload.id}`, {
        isDone: !payload.isDone,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload as Error;
      })
      .addCase(__addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(__changeTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.isDone = !todo.isDone;
        }
      })
      .addCase(__addTodos.rejected, (state, action) => {
        console.log("등록 실패");
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        console.log("삭제 실패");
        console.error(action.error.message);
      })
      .addCase(__changeTodo.rejected, (state, action) => {
        console.log("변경 실패");
      });
  },
});

export default todosSlice.reducer;
