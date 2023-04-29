import * as React from 'react'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "../components/TestDigimishka/Chat";
import './TestDigimishka.css'

const TestDigimishka = () => {
  return (
    <ChakraProvider theme={theme}>
      <Chat />
    </ChakraProvider>
  );
};

export default TestDigimishka;
