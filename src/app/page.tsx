"use client";

import { Room } from "@/components/room";
import { SocketContext } from "@/contexts/socketContext";
import { useContext } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  const socket = useContext(SocketContext);

  return (
    <SocketContext.Provider value={socket}>
      <div className="flex justify-center h-screen w-screen">
        <div className="flex flex-col h-full w-full min-w-[375px] w-[400px] sm:w-[450px] md:w-[800px] p-2">
          <Header />
          <Room />
          <Footer />
        </div>
      </div>
    </SocketContext.Provider>
  );
}
