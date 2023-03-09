import { useRecoilState } from 'recoil';
import { todo } from '@/src/store/atom';
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
    const [term, setTerm] = useState(item.term);
    const index = todoList.findIndex((target) => target.id === item.id);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTodoList(prevState => prevState.map((obj, i) => {
            return i === index ? {...obj, state: e.target.value} : obj
        }))
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack>
            <Text as={"span"} mx={[0, 1]}>{title}</Text>
            <select value={item.state} onChange={handleChange}>
                <option value='not_started'>未着手</option>
                <option value='start'>着手</option>
                <option value='complete'>完了</option>
            </select>
            <Text>{term}</Text>
            <Button onClick={onOpen}>編集</Button>
            <TermSetter index={index} isOpen={isOpen} onClose={onClose} isEdit={true} />
            <DeleteItem id={item.id} index={index} todoList={todoList} setTodoList={setTodoList} />
        </HStack>
    )

    return <></>
}

export default TodoItem;
