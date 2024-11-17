import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FtState = {
    selectedPeer: "",
    isFileSelected: false,
    fileMetaData: {
        name: "",
        type: "",
        lastModified: 0,
        size: 0,
    },
    isDcConnected: false,
    inFlightFileState: {
        name: "",
        size: 0,
        type: "",
        receivedPackets: 0,
        totalPackets: 0,
        percent: 0,
        speed: 0,
    },
};

const ftSlice = createSlice({
    name: "ft",
    initialState,
    reducers: {
        setSelectedPeer: (state, action: PayloadAction<string>) => {
            state.selectedPeer = action.payload;
        },
        unSetSelectedPeer: (state) => {
            state.selectedPeer = "";
        },
        setIsFileSelected: (
            state,
            action: PayloadAction<{ flag: boolean; data: FileMetaData }>
        ) => {
            state.isFileSelected = action.payload.flag;
            if (action.payload.flag) {
                state.fileMetaData = action.payload.data;
            }
        },

        setIsDcConnected: (state, action: PayloadAction<boolean>) => {
            state.isDcConnected = action.payload;
        },
        setInFlightFileState: (
            state,
            action: PayloadAction<InFlightFileState>
        ) => {
            state.inFlightFileState = action.payload;
        },
    },
});

export default ftSlice.reducer;
export const {
    setSelectedPeer,
    unSetSelectedPeer,
    setIsFileSelected,
    setIsDcConnected,
    setInFlightFileState,
} = ftSlice.actions;
