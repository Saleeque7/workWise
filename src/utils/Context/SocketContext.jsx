// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '../../config/config';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context; // Return the context which includes the socket instance
};

export const SocketProvider = ({ children }) => {
  const user = useSelector((state) => state.persisted.user.user);
  const [socket, setSocket] = useState(null); // Initialize the socket state

  useEffect(() => {
    const newSocket = io(config.API_IO); // Initialize the socket connection

    setSocket(newSocket); // Set the socket in state

    // Handle connection events
    newSocket.on('connect', () => {
      newSocket.emit('newUser', user._id); // Emit when connected
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected'); // Handle disconnection
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect(); // Disconnect the socket
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
