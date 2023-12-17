import { useEffect, useState } from "react";
import styled from "styled-components";
import { changeTodo, deleteTodo, getTodos } from "../api/api";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const Main = () => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { isFetching, isLoading, isError, data } = useQuery("todos", getTodos, {
    retry: 5,
    staleTime: 1000,
  });

  const deleteMutation = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const changeMutation = useMutation(changeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoHandler = async (id: string) => {
    const findDeleteTodo = data?.find((todo) => todo.id === id);
    if (findDeleteTodo) {
      deleteMutation.mutate(findDeleteTodo.id);
    }
  };

  const changeTodoHandler = async (id: string) => {
    const findDeleteTodo = data?.find((todo) => todo.id === id);
    if (findDeleteTodo) {
      const payload = {
        id: findDeleteTodo.id,
        isDone: !findDeleteTodo.isDone,
      };
      changeMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return <p>로딩중입니다..!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <>
      <h2>Working</h2>
      <StTodoList>
        {data
          ?.filter((item) => item.isDone === isDone)
          .map((item) => (
            <StTodos key={item.id}>
              <div>{item.title}</div>
              <div>{item.content}</div>
              <StBtn>
                <button onClick={() => changeTodoHandler(item.id)}>완료</button>
                <button onClick={() => deleteTodoHandler(item.id)}>삭제</button>
              </StBtn>
            </StTodos>
          ))}
      </StTodoList>
      <h2>Done</h2>
      <StTodoList>
        {data
          ?.filter((item) => item.isDone)
          .map((item) => (
            <StTodos key={item.id}>
              <div>{item.title}</div>
              <div>{item.content}</div>
              <StBtn>
                <button onClick={() => changeTodoHandler(item.id)}>취소</button>
                <button onClick={() => deleteTodoHandler(item.id)}>삭제</button>
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

const StBtn = styled.div`
  display: flex;
  border: 0px;
  background-color: transparent;
  padding: 15px;
  button {
    margin-left: 20px;
  }
`;
