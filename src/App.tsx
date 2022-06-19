import React, { useEffect, useState } from 'react';
import './App.css';
import { WEBSOCKET_URL } from './config';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { flushSync } from 'react-dom';

const client = new W3CWebSocket(`${WEBSOCKET_URL}`);

function App() {
  const [isConnected, setIsConnected]: any = useState(false);
  const [connectionMessage, setConnectionMessage]: any = useState('Not connected');
  const [messages, setMessages]: any = useState([]);

  useEffect(() => {
    client.onmessage = (message: any) => {
      const messageData = JSON.parse(message.data);
      console.log(messageData);
      setMessages([...messages, messageData]);
    }
  }, []);

  useEffect(() => {
    setIsConnected(true);
    setConnectionMessage('Yay, its connected');
  }, [client.onopen]);

  function buttonHandler(message: string) {
    client.send(JSON.stringify({
      type: "message",
      message
    }));
  }

  return (
    <div>
      <h1 className="title">Chat app</h1>
      <p>{connectionMessage}</p>
      <ul className="chat">
        <ChatItem />
      </ul>
      <button disabled={isConnected ? false : true} onClick={() => buttonHandler('somebalue') }>Send</button>
    </div>
  );
}

function ChatItem() {
  return (
    <li>hujuj</li>
  )
}

export default App;
