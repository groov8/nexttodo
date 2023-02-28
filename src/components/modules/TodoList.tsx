import { useRecoilValue } from 'recoil';
import { stateFilteredTodo } from '../store/selector';
import TodoItem from './TodoItem';
import type { Todo } from '../../../types/Todo';

const TodoList = () => {
  const todoList = useRecoilValue(stateFilteredTodo);
  return (
    <>
      {todoList.map((item: Todo) => <TodoItem key={item.id} item={item} />)}
    </>
  );
}

export default TodoList;