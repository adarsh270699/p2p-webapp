import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PeerBtn } from "./peerBtn";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface Props {
    roomState: RoomState | undefined;
    selectedPeer: string;
    setSelectedPeer: Dispatch<SetStateAction<string>>;
}

export const PeerSelector = ({
    roomState,
    selectedPeer,
    setSelectedPeer,
}: Props) => {
    const maxPeers = 4;
    const [peers, setPeers] = useState<JSX.Element[]>();

    useEffect(() => {
        let counter = 0;
        const newPeers = [];
        if (roomState) {
            for (const [k, v] of Object.entries(roomState.room.peers)) {
                const isDisabled = false;
                const isSelf = roomState.peer.id === k;
                const isSelected = selectedPeer === k;
                const peerName = v.name;
                const peerId = k;

                newPeers.push(
                    <PeerBtn
                        isDisabled={isDisabled}
                        isSelected={isSelected}
                        isSelf={isSelf}
                        setSelectedPeer={isSelf ? () => {} : setSelectedPeer}
                        peerName={peerName}
                        peerId={peerId}
                        iconVal={counter}
                        key={counter}
                    ></PeerBtn>
                );
                counter++;
            }
        }
        while (counter < maxPeers) {
            newPeers.push(
                <PeerBtn
                    isDisabled={true}
                    isSelected={false}
                    isSelf={false}
                    setSelectedPeer={() => {}}
                    peerName={"Invite more peers."}
                    peerId={"NA"}
                    iconVal={7}
                    key={counter}
                ></PeerBtn>
            );
            counter++;
        }
        setPeers(newPeers);
    }, [roomState, selectedPeer]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card className="h-full w-full" isloading={!roomState}>
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
