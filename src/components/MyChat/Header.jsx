import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex w="100%">
            <Avatar size="lg" name="Digimishka" src="https://i.gyazo.com/01022bae8569c411593ef308d1f8eb56.jpg">
                <AvatarBadge boxsize="1.25em" bg="green.500" />
            </Avatar>
            <Flex flexDirection="column" mx="5" justify="center">
                <Text>
                    Digimishka
                </Text>
                <Text color="green.500">Online</Text>
            </Flex>
    );
};