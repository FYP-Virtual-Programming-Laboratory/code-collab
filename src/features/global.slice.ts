import { User } from "@/__generated__/graphql";
import type { RootState } from "@/app/store";
import { random } from "@ctrl/tinycolor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Profile = {
  username: string;
  colour: string;
};

type GlobalState = {
  user?: User;
  colour: string;
  projectId?: number;
};

const initialState: GlobalState = {
  user: undefined,
  colour: random().toHexString(),
  projectId: undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    projectIdSet: (state, action: PayloadAction<{ projectId: number }>) => {
      state.projectId = action.payload.projectId;
    },
    userSet: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { projectIdSet, userSet } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;

export const selectProjectId = (state: RootState) => state.global.projectId!; // Guaranteed to be available
export const selectProfile = (state: RootState) => ({
  user: state.global.user!, // Guaranteed to be available
  colour: state.global.colour,
});
