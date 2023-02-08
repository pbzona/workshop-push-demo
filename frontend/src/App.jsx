import { useState, useEffect } from 'react'
import io from 'socket.io-client';

const socket = io('ws://localhost:3000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMsg, setLastMsg] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('msg', data => {
      console.log('Message received')
      setLastMsg(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('msg');
    };
  }, []);

  const sendPing = () => {
    console.log('Ping!!')
    socket.emit('ping');
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last message: { lastMsg && lastMsg || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </div>
  )
}

export default App
