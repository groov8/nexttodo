import { collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { Button } from '@chakra-ui/react';
import { Todo } from '@/types/Todo';

type Props = {
    id: string
    index: number
    todoList: Todo[]
    setTodoList: (todoList: Todo[]) => void
}

function DeleteItem(props: Props) {

    const uid: string | undefined = auth.currentUser?.uid;
    if (uid) {
        const colRef = collection(db, uid);
        const docRef = doc(colRef, props.id);

        const deleteItem = () => {
            const newTodoList = [
                ...props.todoList.slice(0, props.index),
                ...props.todoList.slice(props.index + 1),
            ];
            props.setTodoList(newTodoList);
            deleteDoc(docRef);
        }
        return (
            <Button colorScheme="blue" onClick={deleteItem}>削除</Button>
        )
    }
    return <></>
}

export default DeleteItem