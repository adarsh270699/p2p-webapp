import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { PeerBtn } from "./peerBtn";

export const PeerSelector = () => {
    const maxPeers = 4;
    const roomState = useSelector((state: RootState) => {
        return state.room;
    });
    const ftState = useSelector((state: RootState) => {
        return state.ft;
    });
    const [peers, setPeers] = useState<JSX.Element[]>();

    useEffect(() => {
        let counter = 0;
        const newPeers = [];
        for (const [k, v] of Object.entries(roomState.room.peers)) {
            const isDisabled = false;
            const isSelf = roomState.peer.id === k;
            const isSelected = ftState.selectedPeer === k;
            const peerName = v.name;
            const peerId = k;

            newPeers.push(
                <PeerBtn
                    isDisabled={isDisabled}
                    isSelected={isSelected}
                    isSelf={isSelf}
                    peerName={peerName}
                    peerId={peerId}
                    iconVal={counter}
                    key={counter}
                ></PeerBtn>
            );
            counter++;
        }
        while (counter < maxPeers) {
            newPeers.push(
                <PeerBtn
                    isDisabled={true}
                    isSelected={false}
                    isSelf={false}
                    peerName={"Invite more peers."}
                    peerId={"NA"}
                    iconVal={7}
                    key={counter}
                ></PeerBtn>
            );
            counter++;
        }
        setPeers(newPeers);
    }, [roomState.room.peers, ftState.selectedPeer]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card className="h-full w-full" isloading={!roomState.room.id}>
            <CardHeader>
                <CardTitle>Step 1</CardTitle>
                <CardDescription>Select a peer from the room.</CardDescription>
                <Separator className="" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-1">
                {peers}
            </CardContent>
        </Card>
    );
};
