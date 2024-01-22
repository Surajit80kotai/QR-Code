import { configureStore } from "@reduxjs/toolkit";
import UtilitySlice from "../slices/UtilitySlice";

export const Store = configureStore({
    reducer: {
        UtilitySlice: UtilitySlice
    }
});