import type { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExplorerState = {
  deleteFileDialog: {
    open: boolean;
    fileId?: number;
  };
};

const initialState: ExplorerState = {
  deleteFileDialog: {
    open: false,
    fileId: undefined,
  },
};

const globalSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    fileDeletionIntiated: (state, action: PayloadAction<number>) => {
      state.deleteFileDialog.fileId = action.payload;
      state.deleteFileDialog.open = true;
    },
    fileDeletionFinshedOrCancelled: (state) => {
      state.deleteFileDialog.open = false;
    },
  },
});

export const { fileDeletionFinshedOrCancelled, fileDeletionIntiated } =
  globalSlice.actions;

const explorerReducer = globalSlice.reducer;
export default explorerReducer;

export const selectExplorer = (state: RootState) => state.explorer;
