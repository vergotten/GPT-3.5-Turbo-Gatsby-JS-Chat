import { Flex } from "@chakra-ui/react";
import * as React from 'react'
import { useState } from "react";
import Divider from "../Chat/Divider";
import Footer from "../Chat/Footer";
import Header from "../Chat/Header";
import Messages from "../Chat/Messages";

const Chat = () => {
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
  const [isTyping, setIsTyping] = useState(false);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async (message) => {
    const newMessage = {
        message,
        direction: "outgoing",
        sender: "user"
    };

    const newMessages = [...messages, newMessage]; // all the old messages, + the new message

    // update our messages state
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    // set a typing indicator (Digimishka is typing)
    setIsTyping(true);
    // process message to Digimishka (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "Digimishka") {
            role = "assistant";
        } else {
            role = "user";
        }
        return { role: role, content: messageObject.message}
  });

  // Get the request body set up with the model we plan to use
  // and the messages which we formatted above. We add a system message in the front to'
  // determine how we want chatGPT to act.
  const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
          systemMessage,  // The system message DEFINES the logic of our chatGPT
          ...apiMessages // The messages from our chat with ChatGPT
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

export default Chat;