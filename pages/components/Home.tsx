import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton } from "./SignIn";
import { auth, db } from "../../firebase";
import SignOutButton from "./SignOut";
import UserInfo from "./UserInfo";
import ItemCreator from "./ItemCreator";

function Home() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ? (
                <>
                    <UserInfo/>
                    <SignOutButton />
                </>
            ) :
                (<SignInButton />)
            }
        </>
    )
}

export default Home