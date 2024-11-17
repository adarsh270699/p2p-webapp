import { Card } from "./ui/card";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const CopyRoomIdCard = () => {
    const { toast } = useToast();
    const roomState = useSelector((state: RootState) => {
        return state.room;
    });
    return (
        <Card className="h-full w-full flex flex-row items-center space-x-2 p-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            disabled={!roomState.room.id}
                            className="m-auto h-full w-full rounded-lg flex gap-2"
                            onClick={() => {
                                if (roomState.room.id) {
                                    try {
                                        navigator.clipboard.writeText(
                                            roomState.room.id
                                        );
                                        toast({
                                            title: "Room ID Copied",
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            }}
                        >
                            <span>Copy Room ID</span>
                            <Copy className="w-4 h-4 text-blue-600" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-sm ">
                            Room ID:&nbsp;
                            <span className="font-bold">
                                {roomState.room.id}
                            </span>
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Card>
    );
};
