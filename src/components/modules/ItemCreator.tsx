import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todo } from '../store/atom';
import { Input, Button, Box, useDisclosure } from '@chakra-ui/react';
import { auth, db } from '../../../firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import TermSetter from "./TermSetter";

const ItemCreator = () => {
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const [todoList, setTodoList] = useRecoilState(todo);
  const uid: any = auth.currentUser?.uid;
  const colRef = collection(db, uid);
  const docRef = doc(colRef);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const addItem = async () => {
    const todo = await addDoc((colRef), {
      title: title,
      state: 'not_started',
      term: term
    })
    setTodoList([
      ...todoList,
      {
        id: todo.id,
        title: title,
        state: 'not_started',
        term: term
      },
    ]);
    setTitle('');
    setTerm("")
  };

  const getTerm = (date: string) => {
    setTerm(date);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m={[0, "2%", "1%"]}>
      <Input h={8} w={52} border={"2px"} placeholder={"Title"} type="text" value={title} onChange={handleChange} />
      <Button onClick={onOpen}>期間を指定</Button>
      <TermSetter index={0} isOpen={isOpen} onClose={onClose} isEdit={false}/>
      <Button colorScheme="blue" onClick={addItem}>追加</Button>
    </Box>
  );
}

export default ItemCreator;