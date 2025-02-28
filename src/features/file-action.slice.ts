import type { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FileActionState = {
  deleteFile: {
    openDialog: boolean;
    fileId?: number;
  };
  newFile: {
    path: string;
    openDialog: boolean;
  };
};

const initialState: FileActionState = {
  deleteFile: {
    openDialog: false,
    fileId: undefined,
  },
  newFile: {
    path: "",
    openDialog: false,
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
    newFileDialogOpened: (state, action: PayloadAction<string | undefined>) => {
      state.newFile.openDialog = true;
      state.newFile.path = action.payload ?? "";
    },
    newFilePathChanged: (state, action: PayloadAction<string>) => {
      state.newFile.path = action.payload;
    },
    newFilePathReset: (state) => {
      state.newFile.path = "";
    },
    newFileDialogClosed: (state) => {
      state.newFile.openDialog = false;
    },
  },
});

export const {
  fileDeletionFinshedOrCancelled,
  fileDeletionIntiated,
  newFileDialogOpened,
  newFilePathChanged,
  newFilePathReset,
  newFileDialogClosed,
} = globalSlice.actions;

const fileActionReducer = globalSlice.reducer;
export default fileActionReducer;

export const selectDeleteFile = (state: RootState) =>
  state.fileAction.deleteFile;
export const selectNewFile = (state: RootState) => state.fileAction.newFile;
