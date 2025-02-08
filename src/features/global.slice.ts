import type { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalState = {
  projectId: number | null;
};

const initialState: GlobalState = {
  projectId: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    projectIdSet: (state, action: PayloadAction<{ projectId: number }>) => {
      state.projectId = action.payload.projectId;
    },
  },
});

export const { projectIdSet } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;

export const selectProjectId = (state: RootState) => state.global.projectId;
