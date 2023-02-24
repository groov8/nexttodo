import { useRecoilState } from 'recoil';
import { todo } from '../store/atom';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import type { Todo } from '../../../types/Todo';
import TermSetter from './TermSetter';
import { useState } from 'react';
import DeleteItem from './DeleteItem';

type Props = {
    item: Todo
}

const TodoItem = (item: Todo) => {
    const [todoList, setTodoList] = useRecoilState(todo);
    const [term, setTerm] = useState("");
    const index = todoList.findIndex((target) => target.id === item.id);

    const handleChange = (e: any) => {
        Itemstate(e.target.value);
    };

    const Itemstate = (newState: any) => {
        const newTodoList = [
            ...todoList.slice(0, index),
            { ...item, state: newState },
            ...todoList.slice(index + 1),
        ];
        setTodoList(newTodoList)
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack>
            <Text as={"span"} mx={[0, 1]}>{item.title}</Text>
            <select value={item.state} onChange={handleChange}>
                <option value='not_started'>未着手</option>
                <option value='start'>着手</option>
                <option value='complete'>完了</option>
            </select>
            <Text>{item.term}</Text>
            <Button onClick={onOpen}>編集</Button>
            <TermSetter isOpen={isOpen} onClose={onClose} setTerm={setTerm} isEdit={true} />
            <DeleteItem id={item.id} index={index} todoList={todoList} setTodoList={setTodoList}/>
        </HStack>
    )

    return <></>
}

export default TodoItem;
