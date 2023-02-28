import { auth, db } from "@/firebase";
import { Todo } from "@/types/Todo";
import { Button } from "@chakra-ui/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil"
import { filter, todo } from "./components/store/atom";

function DeleteItems() {
    const [todoList, setTodoList] = useRecoilState(todo);
    const state = useRecoilValue(filter).state;
    const uid: string | undefined = auth.currentUser?.uid;
    if (uid) {
        const colRef = collection(db, uid);
        let tmp: Todo[] = [];
        return (
            <Button onClick={() => {
                if (state === "all") { todoList.forEach(item => deleteDoc(doc(colRef, item.id)))}
                else {
                    todoList.forEach(item => item.state === state ? deleteDoc(doc(colRef, item.id)) : tmp.push(item))
                }
                setTodoList(tmp)
            }}>まとめて削除</Button>
        )
    }
    return <></>
}

export default DeleteItems