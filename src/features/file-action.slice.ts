import type { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FileActionState = {
  deleteFile: {
    openDialog: boolean;
    fileId?: number;
  };
};

const initialState: FileActionState = {
  deleteFile: {
    openDialog: false,
    fileId: undefined,
  },
};

const globalSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    fileDeletionIntiated: (state, action: PayloadAction<number>) => {
      state.deleteFile.fileId = action.payload;
      state.deleteFile.openDialog = true;
    },
    fileDeletionFinshedOrCancelled: (state) => {
      state.deleteFile.openDialog = false;
    },
  },
});

export const { fileDeletionFinshedOrCancelled, fileDeletionIntiated } =
  globalSlice.actions;

const fileActionReducer = globalSlice.reducer;
export default fileActionReducer;

export const selectDeleteFile = (state: RootState) =>
  state.fileAction.deleteFile;
