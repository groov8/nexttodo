import { todo } from "../store/atom";
import { useRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";

function Sort() {
    const [todoList, setTodoList] = useRecoilState(todo);
    const tmp = todoList.concat();
    const sortList = tmp.sort((a, b) => Date.parse(a.term) - Date.parse(b.term));
    return (
        <Button onClick={() => {setTodoList(sortList)}}>ソート</Button>
    )
}

export default Sort