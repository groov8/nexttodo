import { todo } from "../store/atom";
import { useRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";

function Sort() {
    const [todoList, setTodoList] = useRecoilState(todo);
<<<<<<< Updated upstream
    const tmp = todoList.concat();
    const sortList = tmp.sort((a, b) => Date.parse(a.term) - Date.parse(b.term));
    return (
        <Button onClick={() => {setTodoList(sortList)}}>ソート</Button>
=======
    const sortList = [...todoList].sort((a, b) => Date.parse(a.term) - Date.parse(b.term));
    return (
        <Button onClick={() => {setTodoList(sortList), console.log(todoList)}}>ソート</Button>
>>>>>>> Stashed changes
    )
}

export default Sort