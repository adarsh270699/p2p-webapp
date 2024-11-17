import { fetchRoom } from "@/lib/roomUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RoomState = {
    peer: {
        id: "",
        name: "",
        roomId: "",
        lastActive: "",
        createdAt: "",
    },
    room: {
        id: "",
        peers: {} as { string: Peer },
        createdAt: "",
        lastActive: "",
    },
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomState: (state, action: PayloadAction<RoomState>) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomStateAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const getRoomStateAsync = createAsyncThunk(
    "room/getStateAsync",
    async (peerId: string) => {
        let res = await fetchRoom(peerId);
        try {
            if (res.success) {
                if (res.data.peer?.roomId) {
                    return res.data;
                }
            }
            throw "error getting room data";
        } catch (e: any) {
            console.log(e);
        }
    }
);

export default roomSlice.reducer;
export const { setRoomState } = roomSlice.actions;
