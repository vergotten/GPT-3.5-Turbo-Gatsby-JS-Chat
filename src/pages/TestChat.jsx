import * as React from 'react'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "../components/Chat";
import './App.css'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Chat />
    </ChakraProvider>
  );
};

export default App;
