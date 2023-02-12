import { Button, Box } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from "../../firebase";
import UserInfo from './UserInfo';

const SignInButton = () => {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
    };

    return (
        <Box p={8} minW={"100vw"} minH={"100vh"} display="flex" bg="teal.400">
            <Button minW={"25%"} minH={"10vw"} fontSize={"3rem"} colorScheme={"blue"} m={"auto"} onClick={signInWithGoogle}>
                Sign In
            </Button>
        </Box>
    )
}


export { SignInButton };