import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton } from "../components/modules/SignIn"
import { auth } from "../../firebase";
import UserInfo from "../components/modules/UserInfo";
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