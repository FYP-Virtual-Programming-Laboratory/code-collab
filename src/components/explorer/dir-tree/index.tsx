import { useAppSelector } from "@/app/hooks";
import { FileTreeContext } from "@/components/file-tree.context";
import { selectProject } from "@/features/global.slice";
import { useContext } from "react";
import { ExplorerItem } from "../explorer-item";
import { DirTreeNode } from "./dir-tree-node";

export function DirTree() {
  const { tree } = useContext(FileTreeContext);
  const project = useAppSelector(selectProject);

  return (
    <ExplorerItem title={project?.name || ""}>
      <DirTreeNode node={tree} />
    </ExplorerItem>
  );
}
