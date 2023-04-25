import { useState } from 'react'
import * as React from 'react'
import Layout from '../components/layout'
import './digimishka.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


// "Explain things like you would to a 10 year old learning how to code."
// "Explain things like you're talking to a software professional with 2 years of experience."
const systemMessage = {
    role: "system",
    content: "Explain things like you're talking to a software professional with 2 years of experience."
}

function DigimishkaPage() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am Digimishka!",
            sentTime: "just now",
            sender: "Digimishka"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
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
        <Layout pageTitle="Chat with Digimishka">
            <div className="App">
                <div style={{ position: "relative", height: "490px", width: "380px" }}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={isTyping ? <TypingIndicator content="Digimishka is typing" /> : null}
                            >
                                {messages.map((message, i) => {
                                    return <Message key={i} model={message} />
                                })}
                            </MessageList>
                            <MessageInput placeholder='Type message here' onSend={handleSend} />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </Layout>
    )
}

export const Head = () => <title>Chat with Digimishka</title>

export default DigimishkaPage