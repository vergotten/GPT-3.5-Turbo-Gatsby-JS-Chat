import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import { VStack, Radio, RadioGroup, Icon } from "@chakra-ui/react";
import { FaCog  } from "react-icons/fa";

const Header = ({ handleCheckboxChange,
                  handleSettingsClick,
                  showSettings,
                  setShowSettings,
                  model,
                  setModel }) => {
  return (
    <Flex w="100%" bg="#000000">
      <Avatar size="lg" name="Digimishka" src="https://i.gyazo.com/01022bae8569c411593ef308d1f8eb56.jpg">
        <AvatarBadge boxSize="0.75em" bg="green.500" borderColor="white" borderWidth="2px" top="1.3em"/>
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold" color="green.500">
          Digimishka
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="regular" color="gray.100">
          <RadioGroup name="models" defaultValue="gpt-4" colorScheme="green" >
            <VStack direction="row" spacing="4px" alignItems="flex-start">
              <Radio value="gpt-4"
                     checked={model === "gpt-4"}
                     onChange={ handleCheckboxChange }>
                GPT-4
                  <Icon as={ FaCog } ml="2" style={{ marginBottom: '-2px' }} onClick={ handleSettingsClick } />
              </Radio>
              <Radio value="gpt-3.5"
                     checked={model === "gpt-3.5"}
                     onChange={ handleCheckboxChange }
                     isDisabled
                     _disabled={{
                       bg: 'none',
                       borderColor: 'gray.300',
                     }}>
                GPT-3.5-turbo
                  <Icon as={ FaCog } ml="2" style={{ marginBottom: '-2px' }} onClick={ handleSettingsClick } />
              </Radio>
            </VStack>
          </RadioGroup>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
