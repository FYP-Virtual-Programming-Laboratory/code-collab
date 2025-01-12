import EditorTabs from "@/components/editor-tabs";
import Explorer from "@/components/explorer";
import { FileTreeContext } from "@/components/file-tree.context";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createFileTree, initFileCache } from "@/lib/file-tree";
import { getFiles } from "@/mocks";

const fileTree = createFileTree(getFiles());
const fileCache = initFileCache(fileTree);

export default function EditorView() {
  return (
    <FileTreeContext.Provider value={{ tree: fileTree, cache: fileCache }}>
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
    </FileTreeContext.Provider>
  );
}
