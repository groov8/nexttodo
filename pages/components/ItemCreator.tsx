import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todo } from '../atom';
import { Input, Button } from '@chakra-ui/react';
import { auth, db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

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

  const addTerm = () => {
    
  }

  return (
    <div>
      <Input h={8} w={52} border={"2px"} placeholder={"Title"} type="text" value={title} onChange={handleChange} />
      <Button colorScheme={'green'} onClick={addTerm}>期間を指定</Button>
      <Button colorScheme="blue" onClick={addItem}>追加</Button>
    </div>
  );
}

export default ItemCreator;