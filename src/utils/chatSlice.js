import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./contants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.message.splice(LIVE_CHAT_COUNT, 1);
      state.message.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
