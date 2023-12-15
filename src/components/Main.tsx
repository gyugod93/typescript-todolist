import React, { useState } from "react";
import { TodoType } from "..";
import styled from "styled-components";

type MainProps = {
  todos: TodoType[];
  deleteTodoHandler: (id: string) => void;
  isDone: boolean;
  changeTodoIsDoneHandler: (id: string) => void;
};

const Main: React.FC<MainProps> = ({
  todos,
  deleteTodoHandler,
  isDone,
  changeTodoIsDoneHandler,
}) => {
  return (
    <>
      <h2>Working</h2>
      <StTodoList>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo) => (
            <StTodos key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.content}</div>
              <StBtn>
                <button onClick={() => changeTodoIsDoneHandler(todo.id)}>
                  완료
                </button>
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
            <StTodos key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.content}</div>
              <StBtn>
                <button onClick={() => changeTodoIsDoneHandler(todo.id)}>
                  취소
                </button>
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
