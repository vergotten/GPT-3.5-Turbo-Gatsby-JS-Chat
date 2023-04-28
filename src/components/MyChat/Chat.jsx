import { Flex } from "@chakra-ui/react";
import * as React from 'react';
import { useState } from 'react';
import Header from "./Header.jsx";
import Divider from "./Divider.jsx";
import Messages from "./Messages.jsx";
import Footer from "./Footer.jsx";

const MyChat = () => {
  const [messages, setMessages] = useState([
    { from: "Digimishka", text: "Hi, My Name is Digimishka. Go ahead and send me a message. ", sentTime: "just now" },
    { from: "user", text: "Hey there, Digimishka! What can you do?", sentTime: "just now" },
    {
      from: "Digimishka",
      text:
        "As a chat gpt3.5-turbo model trained as assistant I can answer your questions. You can use /help command for more information.",
      sentTime: "just now"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  {/*
  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "user", text: data, sentTime: "just now" }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "Digimishka", text: data }]);
    }, 1000);
  };
  */}

  const handleSendMessage = async (message) => {
    if (!inputMessage.trim().length) {
      return;
    }

    const data = inputMessage;

    const newMessage = {
      text: data,
      direction: "outgoing",
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Digimishka") {
        role = "assistant";
      } else {
        role = "user";
    }
    return { role: role, content: messageObject.message }
  });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "Digimishka"
        }]);
      setIsTyping(false);
    });
  }

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


