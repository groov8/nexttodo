import { Button } from "@chakra-ui/react";
import { auth } from "../../firebase";


function SignOutButton() {
    return (
        <Button h={"6vh"} w={"8vw"} colorScheme={"facebook"} onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    )
}

export default SignOutButton