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

interface Props {
    file: File | null;
    roomState: RoomState | undefined;
    selectedPeer: string;
}

export const SendFileCard = ({ file, roomState, selectedPeer }: Props) => {
    const socket = useContext(SocketContext);

    const handleSend = () => {
        if (roomState && file) {
            const transaction: Transaction = {
                from: roomState?.peer.id,
                to: selectedPeer,
                event: "init-transfer-reciever",
                data: null,
            };
            socket.emit(transaction.event, transaction);
        }
    };
    return (
        <Card className="h-full w-full" isloading={!roomState}>
            <CardHeader className="">
                <CardTitle>Step 3</CardTitle>
                <CardDescription>Send file.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Button
                    onClick={handleSend}
                    disabled={!file}
                    className="h-full w-full rounded-lg flex items-center justify-center gap-2"
                >
                    <span>Send File</span>

                    <MoveRight className="w-6 h-6 text-blue-600" />
                </Button>
            </CardContent>
        </Card>
    );
};
