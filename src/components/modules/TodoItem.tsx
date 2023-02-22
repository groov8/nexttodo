import { useRecoilState } from 'recoil';
import { todo } from '../store/atom';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import type { Todo } from '../../../types/Todo';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import TermSetter from './TermSetter';
import { useState } from 'react';

type Props = {
    item: Todo
}

const TodoItem = ({ item }: Props) => {
    const [todoList, setTodoList] = useRecoilState(todo);
    const [editTitle, setEditTitle] = useState(item.title)
    const [term, setTerm] = useState("");
    const index = todoList.findIndex((target) => target.id === item.id);
    const uid: string | undefined = auth.currentUser?.uid;
    if (uid) {
        const colRef = collection(db, uid);
        const docRef = doc(colRef, item.id);

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

        const deleteItem = () => {
            const newTodoList = [
                ...todoList.slice(0, index),
                ...todoList.slice(index + 1),
            ];
            setTodoList(newTodoList);
            deleteDoc(docRef);
        };

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
                <TermSetter isOpen={isOpen} onClose={onClose} title={editTitle} setTitle={setEditTitle} setTerm={setTerm} isEdit={false}/>
                <Button m={[1, 0, 1, 1]} colorScheme="blue" onClick={deleteItem}>削除</Button>
            </HStack>
        )
    }
    return <></>
}

export default TodoItem;
