import * as React from 'react'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "../components/Chat/Chat";
import './App.css'

const TestChat = () => {
  return (
    <ChakraProvider theme={theme}>
      <Chat />
    </ChakraProvider>
  );
};

export default TestChat;
