"use client";
import { setStock } from "@/state-manager/features/stock";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

type ContextType = {
  transport: string;
  isConnected: boolean;
  socket: Socket | undefined;
};

const initialState = {
  isConnected: false,
  transport: "N/A",
  socket: undefined,
};

const SocketContext = createContext<ContextType>(initialState);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket?.on("stock-data", (stock) => {
      console.log("🚀 ~ socket?.on ~ stock:", stock);
      dispatch(setStock(stock));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, transport, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
