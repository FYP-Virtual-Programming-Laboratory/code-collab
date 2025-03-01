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
    fileOpened: (state, action: PayloadAction<{ fileId: string }>) => {
      const idx = state.files.indexOf(action.payload.fileId);

      if (idx !== -1) {
        // File is already open
        state.activeFileIdx = idx;
        return;
      }

      state.files.push(action.payload.fileId);
      state.activeFileIdx = state.files.length - 1;
    },
    fileClosed: (state, action: PayloadAction<{ index: number }>) => {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.files.length
      ) {
        // File is not open
        return;
      }

      const fileId = state.files[action.payload.index];
      state.files = state.files.filter((id) => id !== fileId);

      if (state.activeFileIdx === action.payload.index) {
        if (state.files.length === 0) {
          state.activeFileIdx = null;
        } else if (action.payload.index === state.files.length) {
          state.activeFileIdx = Math.max(0, action.payload.index - 1);
        }
      } else if (
        state.activeFileIdx &&
        state.activeFileIdx >= state.files.length
      ) {
        state.activeFileIdx = state.files.length - 1;
      }
    },
    fileActivated: (state, action: PayloadAction<{ index: number }>) => {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.files.length
      ) {
        // File is not open
        return;
      }

      state.activeFileIdx = action.payload.index;
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
export const selectActiveFileId = (state: RootState) =>
  state.openedFiles.activeFileIdx !== null
    ? state.openedFiles.files[state.openedFiles.activeFileIdx]
    : null;
