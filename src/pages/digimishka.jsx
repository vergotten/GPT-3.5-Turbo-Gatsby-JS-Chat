import * as React from 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "../components/Digimishka/Chat";

const Digimishka = () => {
    return (
        <ChakraProvider theme={theme}>
            <Chat />
        </ChakraProvider>
    );
};

export default Digimishka;
