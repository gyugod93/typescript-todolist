import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { TodoType } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { addTodos } from "../redux/modules/todosSlice";
import jsonServerAPI from "../api/api";

function Header() {
  const dispatch = useDispatch();
  const uuid = uuidv4();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: TodoType = {
      id: uuid,
      title,
      content,
      isDone: false,
    };
    try {
      await jsonServerAPI.post(`/todos`, newTodo);
      dispatch(addTodos(newTodo));
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <StH1>My Todo List</StH1>
      <StForm onSubmit={(e) => addTodoHandler(e)}>
        <StInput>
          <label>제목 :</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>내용 :</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </StInput>
        <button type="submit">추가하기</button>
      </StForm>
    </div>
  );
}

const StH1 = styled.h1`
  background-color: beige;
  margin: 0;
  padding: 30px;
`;

const StForm = styled.form`
  display: flex;
  padding: 50px;
  background-color: #bce2ff;
  justify-content: space-between;
`;

const StInput = styled.div`
  display: flex;
  input {
    margin-left: 10px;
  }
  label {
    margin-left: 10px;
  }
`;
export default Header;
