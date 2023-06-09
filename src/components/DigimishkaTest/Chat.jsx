import { Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../DigimishkaTest/Divider";
import Footer from "../DigimishkaTest/Footer";
import Header from "../DigimishkaTest/Header";
import Messages from "../DigimishkaTest/Messages";
import SettingsWindow from "./SettingsWindow";

const Chat = () => {

  // initializing useStates
  const [model, setModel] = useState("gpt-4"); // Header
  const [showSettings, setShowSettings] = useState(false);  // Header
  const [inputMessage, setInputMessage] = useState(""); // Footer
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    { from: "Digimishka", text: "Hi, My Name is Digimishka. Go ahead and send me a message." },
    { from: "user", text: "Hey there, Digimishka! What can you do?" },
    {
      from: "Digimishka",
      text: "As a chat gpt4 model I can answer your questions. "
    }
  ]);

  // handleCheckboxChange -> Header
  const handleCheckboxChange = (event) => { // Do something when the Checkbox value changes
    setModel(event.target.value)
    console.log(event.target.name, event.target.checked);
  };

  // handleSettingsClick -> Header
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    // { showSettings && <SettingsWindow /> } // if showSettings true render SettingsWindow
    //window.alert("selected model: " + model);
    //window.alert("showSettings: " + showSettings)
    };

  // handleSendMessage -> Footer
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
    //await processMessageToChatGPT3_5(newMessages);
  };

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
        <Header
          handleCheckboxChange={handleCheckboxChange}
          handleSettingsClick={handleSettingsClick}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          model={model}
          setModel={setModel}
        />
        <Divider />
        {showSettings && <SettingsWindow />}
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
