import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./slices/roomSlice";
import ftSlice from "./slices/ftSlice";

export const store = configureStore({
    reducer: {
        room: roomSlice,
        ft: ftSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
