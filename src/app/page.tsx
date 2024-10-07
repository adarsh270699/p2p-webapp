"use client";

import { Room } from "@/components/room";
import { SocketContext } from "@/contexts/socketContext";
import { useContext } from "react";

export default function Home() {
    const socket = useContext(SocketContext);

    return (
        <SocketContext.Provider value={socket}>
            <Room />
        </SocketContext.Provider>
    );
}
