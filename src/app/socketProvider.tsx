"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/socket";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize socket on first render
  useEffect(() => {

    if (!socket) {
      const newSocket = getSocket() 

      newSocket.on("connect", () => {
        console.log("Socket connected");
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      })

      newSocket.on("testing", (data) => {
        console.log(data);
      })

      setSocket(newSocket);
    };

    // Cleanup on unmount
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
