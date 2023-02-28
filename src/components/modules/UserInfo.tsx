import { auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect} from "react";
import { useRecoilState } from "recoil";
import { todo } from "../store/atom";
import { Todo } from "../../../types/Todo";
import { Img, Box, HStack } from "@chakra-ui/react";
import ItemCreator from "./ItemCreator";
import TodoList from "./TodoList";
import DisplaySelector from "./DisplaySelector";
import SignOutButton from "./SignOut";
import DeleteItems from "@/src/components/modules/DeleteItems";

function UserInfo() {
    const [data, setData] = useRecoilState(todo);
    const uid: string | undefined = auth.currentUser?.uid;
    useEffect(() => {
        if (uid) {
            const colRef = collection(db, uid);
            if (colRef) {
                getDocs(colRef).then((snapShot) => {
                    let tmp: Todo[] = [];
                    snapShot.forEach((item) => { tmp.push({ ...item.data() as Todo, ...{ id: item.id } }) })
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
                <HStack>
                <DisplaySelector />
                <DeleteItems/>
                </HStack>
                <ItemCreator />
                <TodoList />
            </Box>
        </>
    )
}

export default UserInfo