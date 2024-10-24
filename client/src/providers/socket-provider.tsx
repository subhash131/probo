"use client";
import { setOrderbook } from "@/state-manager/features/orderbook";
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
  isConnected: boolean;
  socket: Socket | undefined;
};

const initialState = {
  isConnected: false,
  socket: undefined,
};

const SocketContext = createContext<ContextType>(initialState);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);

      socket?.on("stock-data", (stock) => {
        dispatch(setStock(stock));
      });
      socket?.on("orderbook", (orderbook) => {
        dispatch(setOrderbook(orderbook));
      });
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
