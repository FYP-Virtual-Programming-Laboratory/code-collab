import type { RootState } from "@/app/store";
import { random } from "@ctrl/tinycolor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function generateRandomName() {
  return "user-" + Math.random().toString(36).substring(2, 9);
}

export type Profile = {
  username: string;
  colour: string;
};

const storedProfile = localStorage.getItem("profile");
let parsedProfile: Profile;

if (!storedProfile) {
  parsedProfile = {
    colour: random().toHexString(),
    username: generateRandomName(),
  };
  localStorage.setItem("profile", JSON.stringify(parsedProfile));
} else {
  parsedProfile = JSON.parse(storedProfile) as Profile;
}

type GlobalState = {
  profile: Profile;
  projectId: number | null;
};

const initialState: GlobalState = {
  profile: parsedProfile,
  projectId: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    projectIdSet: (state, action: PayloadAction<{ projectId: number }>) => {
      state.projectId = action.payload.projectId;
    },
    profileSet: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const { projectIdSet, profileSet } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;

export const selectProjectId = (state: RootState) => state.global.projectId;
export const selectProfile = (state: RootState) => state.global.profile;
