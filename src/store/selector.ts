import { selector, useRecoilState } from 'recoil';
import { todo, filter } from "./atom";

export const stateFilteredTodo = selector({
    key: 'stateFilteredTodo',
    get: ({ get }) => {
        const state = get(filter).state;
        const list = get(todo);
        if (state === 'all') { return list };
        return list.filter((item) => item.state === state);
    }
});

export const a= selector({
    key: "a",
    get: ({get}) => {
        const list = get(todo);
        const [todoList, setTodoList] = useRecoilState(todo)
    }
})