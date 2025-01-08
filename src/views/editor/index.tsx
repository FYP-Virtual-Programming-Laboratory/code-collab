import Explorer from "@/components/explorer";
import { FileTreeContext } from "@/components/file-tree.context";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createFileTree } from "@/lib/file-tree";
import { getFiles } from "@/mocks";
import Editor from "../../components/editor";

export default function EditorView() {
  return (
    <FileTreeContext.Provider value={createFileTree(getFiles())}>
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <Explorer />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <Editor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FileTreeContext.Provider>
  );
}
