import { useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import type { Todo } from '../../../types/Todo';
import { stateFilteredTodo } from '@/src/store/selector';

const TodoList = () => {
  const todoList = useRecoilValue(stateFilteredTodo);
  return (
    <>
      {todoList.map((item: Todo) => <TodoItem key={item.id} item={item} />)}
    </>
  );
}

export default TodoList;