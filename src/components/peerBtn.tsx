import { CheckCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";
import { setSelectedPeer, unSetSelectedPeer } from "@/store/slices/ftSlice";
import { Button } from "./ui/button";
import { PeerIcon } from "./ui/icons/peerIcon";

interface Props {
    iconVal: number;
    peerName: string;
    peerId: string;
    isSelected: boolean;
    isDisabled: boolean;
    isSelf: boolean;
}

export const PeerBtn = ({
    iconVal,
    peerName,
    peerId,
    isSelected,
    isDisabled,
    isSelf,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = () => {
        if (isSelected) {
            dispatch(unSetSelectedPeer());
        } else if (!isSelf) {
            dispatch(setSelectedPeer(peerId));
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
