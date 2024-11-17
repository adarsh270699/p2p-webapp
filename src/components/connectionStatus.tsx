import { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SocketContext } from "@/contexts/socketContext";

export function ConnectionStatus() {
    const socket = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        setIsConnected(socket.connected);
    }, [socket.connected]);

    const customClassNames = isConnected ? "text-green-600" : "text-red-600";
    return (
        <div className="flex flex-row">
            <p className="text-sm text-muted-foreground">
                Backend Connection Status:&nbsp;
                <span className={cn("font-bold", customClassNames)}>
                    {isConnected ? "Connected" : "Disconnected"}
                </span>
            </p>
        </div>
    );
}
