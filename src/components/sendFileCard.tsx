import { Button } from "./ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { SocketContext } from "../contexts/socketContext";
import { useContext } from "react";
import { MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { stat } from "fs";

export const SendFileCard = () => {
    const socket = useContext(SocketContext);
    const roomState = useSelector((state: RootState) => {
        return state.room;
    });
    const ftState = useSelector((state: RootState) => {
        return state.ft;
    });
    const handleSend = () => {
        if (
            roomState.room.id &&
            ftState.isFileSelected &&
            ftState.selectedPeer
        ) {
            const transaction: Transaction = {
                from: roomState.peer.id,
                to: ftState.selectedPeer,
                event: "init-transfer-reciever",
                data: null,
            };
            socket.emit(transaction.event, transaction);
        }
    };
    return (
        <Card className="h-full w-full" isloading={!roomState.room.id}>
            <CardHeader className="">
                <CardTitle>Step 3</CardTitle>
                <CardDescription>Send file.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Button
                    onClick={handleSend}
                    disabled={!ftState.isFileSelected || !ftState.selectedPeer}
                    className="h-full w-full rounded-lg flex items-center justify-center gap-2"
                >
                    <span>Send File</span>
                    <MoveRight className="w-6 h-6 text-blue-600" />
                </Button>
            </CardContent>
        </Card>
    );
};
