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
  },
});

export default ftSlice.reducer;
export const {
  setSelectedPeer,
  unSetSelectedPeer,
  setIsFileSelected,
  setIsDcConnected,
} = ftSlice.actions;
