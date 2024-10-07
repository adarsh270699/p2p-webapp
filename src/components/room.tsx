import * as React from "react";

import { SocketContext } from "@/contexts/socketContext";
import { useContext, useState, useEffect } from "react";
import { PeerSelector } from "./peerSelectorCard";
import { CopyRoomIdCard } from "./copyRoomIdCard";
import { JoinRoomCard } from "./joinRoomCard";
import { fetchRoom } from "@/lib/roomUtils";
import { UploadFileCard } from "./uploadFileCard";
import { SendFileCard } from "./sendFileCard";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { TransferDrawer } from "./transferDrawer";
import {
    initFile,
    initSignal,
    initTransfer,
    initTransferCallbacks,
} from "@/lib/dcTransfer";

export function Room() {
    const socket = useContext(SocketContext);
    const [roomState, setRoomState] = useState<RoomState>();
    const [updatedRoomState, setUpdatedRoomState] = useState<RoomState>();
    const [selectedPeer, setSelectedPeer] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isUploadDisabled, setIsUploadDisabled] = useState(true);
    const [fileTransferPercent, setFileTransferPercent] = useState<number>(0);
    const [isTransferring, setIsTransferring] = useState<boolean>(false);
    const { toast } = useToast();

    const fileTransferCallBack = (fileTransferState: FileTransferState) => {
        if (Math.round(fileTransferState.percent) % 1 === 0) {
            setFileTransferPercent(Math.round(fileTransferState.percent));
        }
    };
    const dcOpenCallBack = () => {
        setIsTransferring(true);
    };
    const dcCloseCallBack = () => {
        setIsTransferring(false);
    };

    useEffect(() => {
        initTransferCallbacks(
            fileTransferCallBack,
            dcOpenCallBack,
            dcCloseCallBack
        );
        if (updatedRoomState) {
            if (
                updatedRoomState?.peer?.roomId &&
                updatedRoomState.peer?.roomId !== roomState?.peer?.roomId
            ) {
                toast({
                    title: "Room Joined",
                });
                setRoomState(updatedRoomState);
            }
        } else {
            toast({
                variant: "destructive",
                title: "Unable To Join Room!",
                description: "Reload app to create new room",
                action: (
                    <Button onClick={() => window.location.reload()}>
                        Reload
                    </Button>
                ),
            });
        }

        setRoomState(updatedRoomState);
    }, [updatedRoomState]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        socket.on("room-updated", async () => {
            if (socket.connected && socket.id) {
                const res = await fetchRoom(socket.id);
                if (res.success) {
                    if (res.data.peer?.roomId) {
                        setUpdatedRoomState(res.data);
                    } else {
                        setUpdatedRoomState(undefined);
                    }
                }
            }
        });

        socket.emit("create-room");

        initSignal(socket);
        socket.on("init-transfer-sender", (transaction: Transaction) => {
            initTransfer(transaction, true);
        });

        socket.on("init-transfer-reciever", (transaction: Transaction) => {
            initTransfer(transaction, false);
        });

        return () => {
            socket.off("room-updated");
            socket.off("init-transfer-sender");
            socket.off("init-transfer-receiver");
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (file) {
            initFile(file);
        }
    }, [file]);

    useEffect(() => {
        if (selectedPeer) {
            setIsUploadDisabled(false);
        } else {
            setIsUploadDisabled(true);
        }
    }, [selectedPeer]);

    return (
        <div className="h-screen w-screen flex">
            <div className="m-auto w-[800px] grid grid-cols-4 gap-1">
                <div className="col-span-1 h-16">
                    <CopyRoomIdCard roomState={roomState} />
                </div>
                <div className="col-span-3 h-16">
                    <JoinRoomCard />
                </div>
                <div className="col-span-2 h-[425px]">
                    <PeerSelector
                        roomState={roomState}
                        selectedPeer={selectedPeer}
                        setSelectedPeer={setSelectedPeer}
                    />
                </div>
                <div className="col-span-2 h-[425px]">
                    <div className="h-full w-full flex flex-col gap-1 ">
                        <div className="w-full h-[300px]">
                            <UploadFileCard
                                roomState={roomState}
                                isUploadDisabled={isUploadDisabled}
                                file={file}
                                setFile={setFile}
                            />
                        </div>
                        <div className="w-full h-[125px]">
                            <SendFileCard
                                file={file}
                                roomState={roomState}
                                selectedPeer={selectedPeer}
                            />
                        </div>
                    </div>
                </div>
                <TransferDrawer
                    isOpen={isTransferring}
                    fileTransferPercent={fileTransferPercent}
                />
            </div>
        </div>
    );
}
