import type { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OpenedFilesState = {
  /** The index of the active file in the {@link OpenedFilesState.files files} array, or null if no file is active. */
  activeFileIdx: number | null;
  /** An array of ids of files that are opened. */
  files: string[];
};

const initialState: OpenedFilesState = {
  activeFileIdx: null,
  files: [],
};

const openedFilesSlice = createSlice({
  name: "openedFiles",
  initialState,
  reducers: {
    fileOpened: (state, action: PayloadAction<string>) => {
      const idx = state.files.indexOf(action.payload);

      if (idx !== -1) {
        // File is already open
        state.activeFileIdx = idx;
        return;
      }

      state.files.push(action.payload);
      state.activeFileIdx = state.files.length - 1;
    },
    fileClosed: (state, action: PayloadAction<number>) => {
      if (action.payload < 0 || action.payload >= state.files.length) {
        // File is not open
        return;
      }

      state.files.splice(action.payload, 1);

      if (state.activeFileIdx === action.payload) {
        if (state.files.length === 0) {
          state.activeFileIdx = null;
        } else if (action.payload === state.files.length) {
          state.activeFileIdx = Math.max(0, action.payload - 1);
        }
      } else if (
        state.activeFileIdx &&
        state.activeFileIdx >= state.files.length
      ) {
        state.activeFileIdx = state.files.length - 1;
      }
    },
    fileActivated: (state, action: PayloadAction<number>) => {
      if (action.payload < 0 || action.payload >= state.files.length) {
        // File is not open
        return;
      }

      state.activeFileIdx = action.payload;
    },
  },
});

export const { fileOpened, fileActivated, fileClosed } =
  openedFilesSlice.actions;

const openedFilesReducer = openedFilesSlice.reducer;
export default openedFilesReducer;

export const selectOpenedFiles = (state: RootState) => state.openedFiles.files;
export const selectActiveFileIdx = (state: RootState) =>
  state.openedFiles.activeFileIdx;
