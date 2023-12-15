import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../types/rootReducer";
import { changeTodo, deleteTodo } from "../redux/modules/todosSlice";

const Main = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [isDone, setIsDone] = useState<boolean>(false);

  const deleteTodoHandler = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const changeTodoHandler = (id: string) => {
    dispatch(changeTodo({ id }));
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
