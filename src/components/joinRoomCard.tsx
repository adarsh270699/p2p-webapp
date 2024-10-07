import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { SocketContext } from "@/contexts/socketContext";
import { Plus } from "lucide-react";

export const JoinRoomCard = () => {
    const socket = useContext(SocketContext);

    const handleJoinRoom = () => {
        if (inputVal) {
            socket.emit("join-room", inputVal);
        }
    };
    const [inputVal, setInputVal] = useState("");
    return (
        <Card className="h-full w-full flex flex-row p-2 gap-2">
            <Input
                onChange={(e) => {
                    setInputVal(e.target.value);
                }}
                value={inputVal}
                className="h-full rounded-lg "
                type="text"
                placeholder="Room ID"
            />
            <Button
                onClick={handleJoinRoom}
                className="h-full rounded-lg flex gap-2"
                type="submit"
            >
                <span>Join Room</span>
                <Plus className="w-5 h-5 text-blue-600" />
            </Button>
        </Card>
    );
};
