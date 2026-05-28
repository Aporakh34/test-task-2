import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import gridReducer from "./features/gridSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    grid: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
