import * as React form 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "../components/MyChat/Chat";
import "./MyChat.css"

const MyChat = () => {
    return (
        <ChakraProvider theme={theme}>
            <Chat />
        </ChakraProvider>
    );
};

export default MyChat;
