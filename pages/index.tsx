import { RecoilRoot } from "recoil";
import { ChakraProvider, theme } from "@chakra-ui/react"
import Home from "./components/Home";

export default function index() {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Home/>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}