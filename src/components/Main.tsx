import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../types/rootReducer";
import { changeTodo, deleteTodo } from "../redux/modules/todosSlice";
import jsonServerAPI from "../api/api";

const Main = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [isDone, setIsDone] = useState<boolean>(false);

  const deleteTodoHandler = async (id: string) => {
    try {
      await jsonServerAPI.delete(`/todos/${id}`);
      dispatch(deleteTodo({ id }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeTodoHandler = async (id: string) => {
    try {
      const findTodo = todos.find((todo) => todo.id === id);
      const changeIsDone = !findTodo?.isDone;

      await jsonServerAPI.patch(`/todos/${id}`, {
        isDone: changeIsDone,
      });

      dispatch(changeTodo({ id }));
    } catch (error) {}
  };

  return (
    <>
      <h2>Working</h2>
      <StTodoList>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo) => (
            <StTodos>
              <div>{todo.title}</div>
              <div>{todo.content}</div>
              <StBtn>
                <button onClick={() => changeTodoHandler(todo.id)}>완료</button>
                <button onClick={() => deleteTodoHandler(todo.id)}>삭제</button>
              </StBtn>
            </StTodos>
          ))}
      </StTodoList>
      <h2>Done</h2>
      <StTodoList>
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <StTodos>
              <div>{todo.title}</div>
              <div>{todo.content}</div>
              <StBtn>
                <button onClick={() => changeTodoHandler(todo.id)}>취소</button>
                <button onClick={() => deleteTodoHandler(todo.id)}>삭제</button>
              </StBtn>
            </StTodos>
          ))}
      </StTodoList>
    </>
  );
};

export default Main;

const StTodoList = styled.div`
  display: flex;
`;

const StTodos = styled.div`
  border: 2px solid saddlebrown;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  width: 200px;
  height: 200px;
  margin-left: 20px;
`;

const StBtn = styled.button`
  display: flex;
  border: 0px;
  background-color: transparent;
  padding: 15px;
  button {
    margin-left: 20px;
  }
`;
