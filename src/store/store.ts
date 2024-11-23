import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./slices/roomSlice";
import ftSlice from "./slices/ftSlice";
import inflightSlice from "./slices/inFlightSlice";

export const store = configureStore({
  reducer: {
    room: roomSlice,
    ft: ftSlice,
    inFlight: inflightSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
