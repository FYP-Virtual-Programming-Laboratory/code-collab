import { GetProjectAndUserQuery, User } from "@/__generated__/graphql";
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
  project?: GetProjectAndUserQuery["project"];
};

const initialState: GlobalState = {
  user: undefined,
  colour: random().toHexString(),
  project: undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    projectSet: (
      state,
      action: PayloadAction<GetProjectAndUserQuery["project"]>
    ) => {
      state.project = action.payload;
    },
    userSet: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { projectSet, userSet } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;

export const selectProject = (state: RootState) => state.global.project;
export const selectUser = (state: RootState) => state.global.user;
export const selectColour = (state: RootState) => state.global.colour;
