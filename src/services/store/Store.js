import { configureStore } from "@reduxjs/toolkit";
import UtilitySlice from "../slices/UtilitySlice";
import AuthSlice from "../slices/AuthSlice";

export const Store = configureStore({
    reducer: {
        UtilitySlice: UtilitySlice,
        AuthSlice: AuthSlice
    }
});