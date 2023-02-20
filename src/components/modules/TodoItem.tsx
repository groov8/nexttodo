import { useRecoilState } from 'recoil';
import { todo } from '../atom';
import { Box, Button, Text } from '@chakra-ui/react';
import type { Todo } from '../types/Todo';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

type Props = {
    item: Todo
}

const TodoItem = ({ item }: Props) => {
    const [todoList, setTodoList] = useRecoilState(todo);
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
    
    return (
        <Box>
            <Text as={"span"} mx={[0, 1]}>{item.title}</Text>
            <select value={item.state} onChange={handleChange}>
                <option value='not_started'>未着手</option>
                <option value='start'>着手</option>
                <option value='complete'>完了</option>
            </select>
            <Button m={[1, 0, 1, 1]} colorScheme="blue" onClick={deleteItem}>削除</Button>
        </Box>)
    }
    return <></>
}

export default TodoItem;
