import { gql } from "@/__generated__/gql";
import EditorTabs from "@/components/editor-tabs";
import Explorer from "@/components/explorer";
import { FileTreeContext } from "@/components/file-tree.context";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useYObjects } from "@/hooks/use-y-objects";
import { DirNode } from "@/lib/file-system/dir-node";
import { FileNode } from "@/lib/file-system/file-node";
import { buildTree, initFileCache } from "@/lib/file-system/file-tree";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const LIST_FILES = gql(`
  query ListFiles($projectId: Int!) {
    listFiles(projectId: $projectId) {
      id
      path
      content
    }
  }
`);

export default function EditorView({ projectId }: { projectId: number }) {
  const { data } = useQuery(LIST_FILES, {
    variables: { projectId },
    fetchPolicy: "network-only",
    ssr: false,
  });
  const [fileTree, setFileTree] = useState<DirNode>();
  const [fileCache, setFileCache] = useState<Record<string, FileNode>>({});
  const yObjects = useYObjects();

  useEffect(() => {
    if (!fileTree && data) {
      const fileTree = buildTree(data.listFiles, yObjects);
      setFileTree(fileTree);
      setFileCache(initFileCache(fileTree));
    }
  }, [data, fileTree, yObjects]);

  return (
    <FileTreeContext.Provider
      value={{ tree: fileTree || new DirNode(0, "", 0), cache: fileCache }}
    >
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
