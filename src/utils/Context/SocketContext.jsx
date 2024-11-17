import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { config } from "../../config/config";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const user = useSelector((state) => state.persisted.user.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket;
    if (user?._id) {
      try {
        newSocket = io(config.API_IO);
        setSocket(newSocket);

        newSocket.on("connect", () => {
          newSocket.emit("newUser", user._id);
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  if (!user?._id) {
    return null; 
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
