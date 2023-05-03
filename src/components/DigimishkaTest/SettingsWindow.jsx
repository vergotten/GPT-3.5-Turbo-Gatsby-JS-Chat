import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const SettingsWindow = () => {
  return (
    <Flex w="100%" bg="#000000">
      <Avatar size="lg" name="Digimishka" src="https://i.gyazo.com/01022bae8569c411593ef308d1f8eb56.jpg">
        <AvatarBadge boxSize="0.75em" bg="green.500" borderColor="white" borderWidth="2px" top="1.3em"/>
      </Avatar>
      <Text> Settings </Text>
    </Flex>
  );
};

export default SettingsWindow;