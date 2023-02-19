import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton } from "./SignIn";
import { auth } from "../../firebase";
import UserInfo from "./UserInfo";
function Home() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ? (
                <>
                    <UserInfo />
                </>
            ) :
                (<SignInButton />)
            }
        </>
    )
}

export default Home