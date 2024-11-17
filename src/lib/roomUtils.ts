"use client";
import { serviceConfig } from "@/config/config";

export const fetchRoom = async function name(peerId: string): Promise<Result> {
    const res: Result = { success: false, data: null, msg: null };
    const baseUrl: string = serviceConfig.baseUrl;

    const url: string = `${baseUrl}api/${peerId}`;

    let response: {
        status: string;
        msg: string;
        data: {
            peer: Peer;
            room: Room;
        };
    };
    try {
        response = await (await fetch(url)).json();
    } catch {
        return res;
    }
    if (!response.status || response.status !== "ok" || !response.data) {
        res.msg = `failure at getting room, err: invalid response`;
        return res;
    }
    const data = response.data;

    const newSate: RoomState = {
        peer: {
            id: data?.peer?.id || "",
            name: data?.peer?.name || "",
            roomId: data?.room?.id || "",
            lastActive: data?.peer?.lastActive || new Date().toISOString(),
            createdAt: data?.peer?.createdAt || new Date().toISOString(),
        },
        room: {
            id: data?.room?.id || "",
            peers: { ...data?.room?.peers },
            createdAt: data?.room?.createdAt || new Date().toISOString(),
            lastActive: data?.room?.lastActive || new Date().toISOString(),
        },
    };

    res.success = true;
    res.data = newSate;
    return res;
};
