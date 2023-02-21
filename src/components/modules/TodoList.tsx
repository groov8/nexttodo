import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stateFilteredTodo } from '../store/selector';
import TodoItem from './TodoItem';
import type { Todo } from '../../../types/Todo';
import { useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { todo } from '../store/atom';

const TodoList = () => {
  const setTodo = useSetRecoilState(todo)
  const todoList = useRecoilValue(stateFilteredTodo);
  return (
    <>
      {todoList.map((item: Todo) => <TodoItem key={item.id} item={item} />)}
    </>
  );
}

export default TodoList;