import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add more slices here as needed
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
