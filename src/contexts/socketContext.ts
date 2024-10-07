"use client";
import { socketConfig } from "@/config/config";
import { createContext } from "react";
import { io } from "socket.io-client";

const initSocket = () => {
    return io(socketConfig.baseUrl, socketConfig.options);
};

const socket = initSocket();
export const SocketContext = createContext(socket);
