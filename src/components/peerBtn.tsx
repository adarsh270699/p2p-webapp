import { Button } from "./ui/button";
import { PeerIcon } from "./ui/icons/peerIcon";
import { Badge } from "@/components/ui/badge";

import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

interface Props {
    iconVal: number;
    peerName: string;
    peerId: string;
    isSelected: boolean;
    isDisabled: boolean;
    isSelf: boolean;
    setSelectedPeer: Dispatch<SetStateAction<string>>;
}

export const PeerBtn = ({
    iconVal,
    peerName,
    peerId,
    isSelected,
    isDisabled,
    isSelf,
    setSelectedPeer,
}: Props) => {
    const handleClick = () => {
        if (isSelected) {
            setSelectedPeer("");
        } else {
            setSelectedPeer(peerId);
        }
    };

    let customClassNames = "";
    if (isSelected || isSelf) {
        customClassNames = "text-blue-600";
    }
    return (
        <Button
            disabled={isDisabled}
            className={cn(
                "h-full w-full p-2 rounded-lg",
                `${isSelf && "cursor-no-drop"}`
            )}
            onClick={handleClick}
        >
            <div className="relative h-full w-full p-2 rounded-lg flex flex-col gap-0 justify-center content-center item-center">
                <PeerIcon
                    className={cn("mx-auto", customClassNames)}
                    iconVal={iconVal}
                />
                <div className="flex space-x-1">
                    <p className="mx-auto h-fit w-fit">{peerName}</p>
                </div>

                {(isSelf || isSelected) && (
                    <Badge className="absolute top-0 left-0 bg-blue-600 m-1 rounded-md shadow-none font-thin hover:bg-blue-600">
                        {isSelf ? "Self" : <CheckCheck className="w-4 h-4" />}
                    </Badge>
                )}
            </div>
        </Button>
    );
};
