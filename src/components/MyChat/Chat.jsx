import { Flex } from "@chakra-ui/react";
import * as React from 'react';
import { useState } from 'react';
import Header from "./Header.jsx";

const MyChat = () => {
    return (
        <Flex w="100%" h="100vh" justify="center" align="center">
            <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
                <Header />
            </Flex>
        </Flex>
    );
};

export default MyChat;


