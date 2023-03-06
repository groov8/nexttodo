import { useRecoilState } from 'recoil';
import { todo } from '../store/atom';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import type { Todo } from '../../../types/Todo';
import TermSetter from './TermSetter';
import { ChangeEvent, useState } from 'react';
import DeleteItem from './DeleteItem';

type Props = {
    item: Todo
}

const TodoItem = ({ item }: Props) => {
    const [todoList, setTodoList] = useRecoilState(todo);
    const [title, setTitle] = useState<string | undefined>(item.title);
    const [state, setState] = useState(item.state);
    const [term, setTerm] = useState(item.term);
    const index = todoList.findIndex((target) => target.id === item.id);

    const changeItem = () => {
        const newItem = { id: item.id, title: title ? (title) : (""), state: state, term: term }
        const newTodoList = [
            ...todoList.slice(0, index),
            { ...newItem },
            ...todoList.slice(index + 1),
        ];
        setTodoList(newTodoList);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTodoList(prevState => prevState.map((obj, i) => {
            return i === index ? {...obj, state: e.target.value} : obj
        }))
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack>
            <Text as={"span"} mx={[0, 1]}>{title}</Text>
            <select value={item.state} onChange={(e) => { handleChange}}>
                <option value='not_started'>未着手</option>
                <option value='start'>着手</option>
                <option value='complete'>完了</option>
            </select>
            <Text>{term}</Text>
            <Button onClick={onOpen}>編集</Button>
            <TermSetter isOpen={isOpen} onClose={onClose} title={title} setTitle={setTitle} term={term} setTerm={setTerm} changeItem={changeItem} isEdit={true} />
            <DeleteItem id={item.id} index={index} todoList={todoList} setTodoList={setTodoList} />
        </HStack>
    )

    return <></>
}

export default TodoItem;
