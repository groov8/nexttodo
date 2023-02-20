import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todo } from '../atom';
import { Input, Button, useDisclosure } from '@chakra-ui/react';
import { auth, db } from '../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import Calendar from './Calendar';

const ItemCreator = () => {
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useRecoilState(todo);
  const uid: any = auth.currentUser?.uid;
  const colRef = collection(db, uid);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const addItem = () => {
    const id = Math.random().toString();
    setTodoList([
      ...todoList,
      {
        id: id,
        title: title,
        state: 'not_started',
        term: ''
      },
    ]);
    setDoc(doc(colRef, id), {
      id: id,
      title: title,
      state: 'not_started',
      term: ''
    })
    setTitle('');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Input h={8} w={52} border={"2px"} placeholder={"Title"} type="text" value={title} onChange={handleChange} />
      <Calendar isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
      <Button colorScheme="blue" onClick={addItem}>追加</Button>
    </div>
  );
}

export default ItemCreator;