import { auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todo } from "../atom";
import { Todo } from "../types/Todo";
import { Img, Box, HStack } from "@chakra-ui/react";
import ItemCreator from "./ItemCreator";
import TodoList from "./TodoList";
import DisplaySelector from "./DisplaySelector";
import SignOutButton from "./SignOut";

function UserInfo() {
    const [data, setData] = useRecoilState(todo);
    const uid: string | undefined = auth.currentUser?.uid;
    useEffect(() => {
        if (uid) {
            const colRef = collection(db, uid);
            if (colRef) {
                getDocs(colRef).then((snapShot) => {
                    let tmp: Todo[] = [];
                    snapShot.forEach((item) => { tmp.push(item.data() as Todo) })
                    setData(tmp);
                })
            }
        }
    }, [])

    if (!auth.currentUser?.photoURL) return (<></>)
    return (
        <>
            <Box>
                <HStack>
                    <Img w={"100px"} h={"100px"} my={1} mr={1} ml={2} clipPath={"circle(50px at 50px 50px)"} src={auth.currentUser?.photoURL}></Img>
                    <SignOutButton />
                </HStack>
                <DisplaySelector />
                <ItemCreator />
                <TodoList />
            </Box>
        </>
    )
}

export default UserInfo