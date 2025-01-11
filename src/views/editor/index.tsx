import EditorTabs from "@/components/editor-tabs";
import Explorer from "@/components/explorer";
import { FileTreeContext } from "@/components/file-tree.context";
import { OpenFilesContext } from "@/components/open-files.context";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createFileTree, initFileCache } from "@/lib/file-tree";
import { getFiles } from "@/mocks";
import { useCallback, useMemo, useState } from "react";

const fileTree = createFileTree(getFiles());
const fileCache = initFileCache(fileTree);

export default function EditorView() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [openedFiles, setOpenedFiles] = useState<string[]>([]);

  const openFile = useCallback((fileId: string) => {
    setOpenedFiles((prev) => {
      const idx = prev.indexOf(fileId);

      if (idx !== -1) {
        setActiveIdx(idx);
        return prev;
      }

      setActiveIdx(prev.length);
      return [...prev, fileId];
    });
  }, []);

  const closeFile = useCallback(
    (fileId: string) =>
      setOpenedFiles((prev) => {
        const idx = prev.indexOf(fileId);

        if (idx === -1) {
          return prev;
        }

        const next = prev.filter((f) => {
          return f !== fileId;
        });

        if (idx === activeIdx) {
          if (next.length === 0) setActiveIdx(null);
          else if (idx === next.length) setActiveIdx(idx - 1);
          // else activeIdx is still valid.
        }

        return next;
      }),
    [activeIdx]
  );

  const openFilesContext = useMemo(
    () => ({
      activeIndex: activeIdx,
      setActiveIndex: setActiveIdx,
      fileIds: openedFiles,
      openFile,
      closeFile,
    }),
    [activeIdx, closeFile, openFile, openedFiles]
  );

  return (
    <FileTreeContext.Provider value={{ tree: fileTree, cache: fileCache }}>
      <OpenFilesContext.Provider value={openFilesContext}>
        <div className="h-screen">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20}>
              <Explorer />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <EditorTabs />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </OpenFilesContext.Provider>
    </FileTreeContext.Provider>
  );
}
