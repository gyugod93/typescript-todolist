import React from "react";
import { TodoType } from "..";
import styled from "styled-components";

type HeaderProps = {
  title: string;
  //React.Dispatch - 상태를 변경하는데 사용
  //React.SetStateAction<string> - setState 함수의 인자로 사용될 수 있는 값의 타입
  //즉 상태를 어떻게 업데이트할지 정의
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  addTodoHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Header({
  title,
  setTitle,
  content,
  setContent,
  todos,
  addTodoHandler,
}: HeaderProps) {
  return (
    <div>
      <StH1>My Todo List</StH1>
      <StForm onSubmit={addTodoHandler}>
        <StInput>
          <label htmlFor="titleInput">제목 :</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="contentInput">내용 :</label>
          <input
            type="text"
            id="contentInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </StInput>
        <button type="submit">추가하기</button>
      </StForm>
    </div>
  );
}

//FC로 적용하는 방식도 기억해두기
// const Header: React.FC<HeaderProps> = ({
//   title,
//   content,
//   todos,
//   addTodoHandler,
// }) => {

// };

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
