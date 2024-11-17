import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocketContext } from "@/contexts/socketContext";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch, RootState } from "@/store/store";
import { getRoomStateAsync } from "@/store/slices/roomSlice";

import { setInFlightFileState, setIsDcConnected } from "@/store/slices/ftSlice";
import {
    initSignal,
    initTransfer,
    initTransferCallbacks,
} from "@/lib/dcTransfer";

import { PeerSelector } from "./peerSelectorCard";
import { CopyRoomIdCard } from "./copyRoomIdCard";
import { JoinRoomCard } from "./joinRoomCard";
import { ConnectionStatus } from "./connectionStatus";
import { UploadFileCard } from "./uploadFileCard";
import { SendFileCard } from "./sendFileCard";
import { Button } from "./ui/button";
import { TransferDrawer } from "./transferDrawer";

export function Room() {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const roomState = useSelector((state: RootState) => {
        return state.room;
    });

    const { toast } = useToast();

    const fileTransferCallBack = (inFlightFileState: InFlightFileState) => {
        dispatch(setInFlightFileState({ ...inFlightFileState }));
    };

    const dcOpenCallBack = () => {
        dispatch(setIsDcConnected(true));
    };
    const dcCloseCallBack = () => {
        dispatch(setIsDcConnected(false));
    };

    useEffect(() => {
        if (roomState.room.id) {
            toast({
                title: "Room Joined",
            });
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
    }, [roomState.room.id]);

    useEffect(() => {
        initTransferCallbacks(
            fileTransferCallBack,
            dcOpenCallBack,
            dcCloseCallBack
        );
        socket.on("connect", () => {
            initSignal(socket);
        });

        socket.on("room-updated", async () => {
            if (socket.connected && socket.id) {
                dispatch(getRoomStateAsync(socket.id));
            }
        });

        socket.emit("create-room");

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

    return (
        <div className="w-full h-fit py-10 flex">
            <div className="container px-2 m-auto md:grid md:grid-cols-4 md:gap-1 space-y-1 md:space-y-0">
                <div className="col-span-4">
                    <ConnectionStatus />
                </div>
                <div className="col-span-1 h-16">
                    <CopyRoomIdCard />
                </div>
                <div className="col-span-3 md:col-span-3 h-16">
                    <JoinRoomCard />
                </div>
                <div className="col-span-2 h-[425px]">
                    <PeerSelector />
                </div>
                <div className="col-span-2 h-[425px]">
                    <div className="h-full w-full flex flex-col gap-1 ">
                        <div className="w-full h-[300px]">
                            <UploadFileCard />
                        </div>
                        <div className="w-full h-[125px]">
                            <SendFileCard />
                        </div>
                    </div>
                </div>
                <TransferDrawer />
            </div>
        </div>
    );
}
