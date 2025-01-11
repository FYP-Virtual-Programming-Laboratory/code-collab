import { createContext } from "react";

type OpenFileContext = {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  fileIds: string[];
  openFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
};

export const OpenFilesContext = createContext<OpenFileContext>({
  activeIndex: null,
  setActiveIndex: () => {},
  fileIds: [],
  openFile: () => {},
  closeFile: () => {},
});
