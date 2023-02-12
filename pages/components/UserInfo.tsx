import { auth } from "../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todo } from "../atom";
import { Todo } from "../types/Todo";
import { Img, Box } from "@chakra-ui/react";
import ItemCreator from "./ItemCreator";
import TodoList from "./TodoList";
import DisplaySelector from "./DisplaySelector";

function UserInfo() {
    const [data, setData] = useRecoilState(todo);
    const uid: string | undefined = auth.currentUser?.uid;
    useEffect(() => {
        if (uid) {
            const colRef = collection(db, uid);
            console.log("aaaa")
            if (colRef) {
                getDocs(colRef).then((snapShot) => {
                    let tmp: Todo[] = [];
                    snapShot.forEach((item) => { tmp.push(item.data() as Todo) })
                    setData(tmp);
                    console.log("bbbb");
                })
            }
        }
    }, [])

    if (!auth.currentUser?.photoURL) return (<></>)
    return (
        <>
            <Box>
                <Img w={"100px"} h={"100px"} m={["1%", "auto", "0px", "1%"]} clipPath={"circle(50px at 50px 50px)"} src={auth.currentUser?.photoURL}></Img>
                <DisplaySelector />
                <ItemCreator />
                <TodoList />
            </Box>
        </>
    )
}

export default UserInfo