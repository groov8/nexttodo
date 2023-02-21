import { Filter, Todo } from "../../../types/Todo";
import { atom } from "recoil";

export const todo = atom<Todo[]>({
    key: 'todo',
    default: [],
});

export const filter = atom<Filter>({
    key: "filter",
    default: {
        state: "all",
        term: ""
    }
})