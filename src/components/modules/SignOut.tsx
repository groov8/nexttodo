import { auth } from "../../firebase";


function SignOutButton() {
    return (
        <button onClick={() => auth.signOut()}>
            out
        </button>
    )
}

export default SignOutButton