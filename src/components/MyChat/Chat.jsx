import { Flex } from "@chakra-ui/react";
import * as React from 'react';
import { useState } from 'react';
import Header from "./Header.jsx";
import Header from "./Divider.jsx";
import Header from "./Messages.jsx";
import Header from "./Footer.jsx";

const MyChat = () => {
  const [messages, setMessages] = useState([
    { from: "Digimishka", message: "Hi, My Name is Digimishka. Go ahead and send me a message. ", sentTime: "just now" },
    { from: "user", message: "Hey there, Digimishka! What can you do?", sentTime: "just now" },
    {
      from: "Digimishka",
      message:
        "As a chat gpt3.5-turbo model trained as assistant I can answer your questions. You can use /help command for more information.",
      sentTime: "just now"
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "user", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, {from: "Digimishka", text: data }]);
    }, 1000);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default MyChat;


