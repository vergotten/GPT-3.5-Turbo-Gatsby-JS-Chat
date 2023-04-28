import { Flex } from "@chakra-ui/react";
import * as React from 'react';
import { useState } from "react";
import Header from "../components/Chat/Header.jsx";
import Divider from "../components/Chat/Divider.jsx";
import Messages from "../components/Chat/Messages.jsx";
import Footer from "../components/Chat/Footer.jsx";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "Digimishka", text: "Hi, My Name is Digimishka. Go ahead and send me a message. },
    { from: "user", text: "Hey there, Digimishka! What can you do?" },
    {
      from: "Digimishka",
      text:
        "As a chat gpt3.5-turbo model trained as assistant I can answer your questions. You can use /help command for more information.",
    },
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
      setMessages((old) => [...old, { from: "Digimishka", text: data }]);
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

export default Chat;
