import { todo } from '@/src/store/atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
    index: number
    key: string
    value: string
}

function useChangeItem(props: Props) {
    const [todoList, setTodoList] = useRecoilState(todo);
    const key = props.key;
    const setChangeItem = () => {
        const newTodoList = todoList.map((item, i) => {
            props.index === i ? [...todoList.slice(0, props.index),
            { ...todoList[props.index], key: props.value }, ...todoList.slice(props.index + 1)] : null
        })
        return [newTodoList, setChangeItem];
    }
}

export default useChangeItem
