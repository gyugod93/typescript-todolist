import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import { v4 as uuidv4 } from "uuid";
import { TodoType } from "..";

const Layout = () => {
  const uuid = uuidv4();
  //Header에서 직접 선언할 수도 있지만 props 연습을 위해 여기서 선언
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //이 함수가 실행되면 실제 Main에서 맵핑을 할 수 있어야함
    // 작성한 값을 보내줘야함
    const newTodo = { title, content, id: uuid, isDone };
    setTodos([...todos, newTodo]);
    setTitle("");
    setContent("");
  };

  const deleteTodoHandler = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const changeTodoIsDoneHandler = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <div>
      <Header
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        todos={todos}
        addTodoHandler={addTodoHandler}
      />
      <Main
        todos={todos}
        deleteTodoHandler={deleteTodoHandler}
        isDone={isDone}
        changeTodoIsDoneHandler={changeTodoIsDoneHandler}
      />
    </div>
  );
};

export default Layout;
