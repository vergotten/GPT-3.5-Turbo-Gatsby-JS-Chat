import { Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../Digimishka/Divider";
import Footer from "../Digimishka/Footer";
import Header from "../Digimishka/Header";
import Messages from "../Digimishka/Messages";

// Initial system message to determine ChatGPT functionality
// How it responds, how it talks, etc.
// "Explain things like you would to a 10 year old learning how to code."
// "Explain things like you're talking to a software professional with 2 years of experience."
const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
}

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "Digimishka", text: "Hi, My Name is Digimishka. Go ahead and send me a message." },
    { from: "user", text: "Hey there, Digimishka! What can you do?" },
    {
      from: "Digimishka",
      text: "As a chat gpt3.5-turbo model trained as assistant I can answer your questions. "
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    const newMessage = {
      text: data,
      direction: 'outgoing',
      from: "user"
    };

    const newMessages = [...messages, newMessage]; // all the old messages, + the new message

    // update our messages state
    setMessages(newMessages);
    setInputMessage("");

    // set a typing indicator (Digimishka is typing)
    setIsTyping(true);

    // process message to Digimishka (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // chatMessages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.from === "Digimishka") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.text }
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
        text: data.choices[0].message.content,
        from: "Digimishka"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <Flex w="100%"
          h="100vh"
          justify="center"
          align="center"
          bgImage="url('https://i.gyazo.com/594a03954d22d0cf8b6d129b188cb430.png')"
          bgSize="100%"
    >
      <Flex w={["100%", "100%", "40%"]}
            h="90%"
            flexDir="column"
            align="center"
            position="relative"
            bgImage="url('https://i.gyazo.com/dccd70f7e75ab16fed5e7a941e5e7cf1.png')"
            bgAttachment="fixed"
            bgPosition="center"
      >

        <Header/>
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
