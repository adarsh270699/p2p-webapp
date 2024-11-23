import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InFlightState = {
  name: "",
  size: 0,
  type: "",
  receivedPackets: 0,
  totalPackets: 0,
  percent: 0,
  speed: 0,
};

const inFlightSlice = createSlice({
  name: "inFlight",
  initialState,
  reducers: {
    setInFlightState: (state, action: PayloadAction<InFlightState>) => {
      return action.payload;
    },
  },
});

export default inFlightSlice.reducer;
export const { setInFlightState } = inFlightSlice.actions;
