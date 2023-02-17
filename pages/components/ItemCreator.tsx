import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todo } from '../atom';
import { Input, Button, useDisclosure } from '@chakra-ui/react';
import { auth, db } from '../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import TermSetter from "./TermSetter"

const ItemCreator = () => {
  const [title, setTitle] = useState('');
  const [term, setTerm] = useState("");
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
        term: term
      },
    ]);
    setDoc(doc(colRef, id), {
      id: id,
      title: title,
      state: 'not_started',
      term: term
    })
    setTitle('');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const getTerm = (date:string) => {
    setTerm(date);
  }

  return (
    <div>
      <Input h={8} w={52} border={"2px"} placeholder={"Title"} type="text" value={title} onChange={handleChange} />
      <TermSetter isOpen={isOpen} onOpen={onOpen} onClose={onClose} term={getTerm} />
      <Button colorScheme="blue" onClick={()=>{addItem; console.log(term)}}>追加</Button>
    </div>
  );
}

export default ItemCreator;