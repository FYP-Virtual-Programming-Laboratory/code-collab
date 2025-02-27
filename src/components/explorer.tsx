import { useAppDispatch } from "@/app/hooks";
import { fileOpened } from "@/features/opened-files.slice";
import useContextMenu from "@/hooks/use-context-menu";
import { AbstractNode, NodeType } from "@/lib/file-system/abstract-node";
import { FileNode } from "@/lib/file-system/file-node";
import {
  ChevronDown,
  ChevronRight,
  File,
  FolderClosed,
  FolderOpen,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { sortNodes } from "../lib/file-system/file-tree";
import { NewFileDialog } from "./explorer/new-file-dialog";
import { FileTreeContext } from "./file-tree.context";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Separator } from "./ui/separator";

function DirTreeItem({
  node,
  depth,
  isExpanded = false,
  onClick,
}: Readonly<{
  node: AbstractNode;
  depth: number;
  isExpanded?: boolean;
  onClick?: () => void;
}>) {
  const contextMenu = useContextMenu(node);

  const padding =
    0.5 + (depth - 1) * 0.5 + (node.nodeType() === NodeType.FILE ? 1.2 : 0);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <button
          className="inline-flex gap-1 items-center hover:bg-gray-300 w-full py-0.5"
          style={{ paddingLeft: `${padding}em` }}
          onClick={onClick}
        >
          {node.nodeType() === NodeType.DIR && (
            <>
              {isExpanded ? (
                <ChevronDown size={"1em"} />
              ) : (
                <ChevronRight size={"1em"} />
              )}
            </>
          )}
          {node.nodeType() === NodeType.DIR ? (
            <>
              {isExpanded ? (
                <FolderOpen size={"1em"} />
              ) : (
                <FolderClosed size={"1em"} />
              )}
            </>
          ) : (
            <File size={"1em"} />
          )}
          {node.getName()}
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>{contextMenu}</ContextMenuContent>
    </ContextMenu>
  );
}

function DirTree({
  node,
  depth = 0,
}: Readonly<{ node: AbstractNode; depth?: number }>) {
  const [isExpanded, setIsExpanded] = useState(
    !!node.meta.lastIsExpanded || false
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      node.meta.lastIsExpanded = isExpanded;
    };
  }, [isExpanded, node.meta]);

  if (node instanceof FileNode) {
    return (
      <li key={node.getName()}>
        <DirTreeItem
          node={node}
          depth={depth}
          onClick={() => dispatch(fileOpened({ fileId: node.getId() }))}
        />
      </li>
    );
  }

  if (node.getParent() === null) {
    return (
      <ul>
        {sortNodes(node.getChildren()).map((child) => (
          <DirTree key={child.getName()} node={child} depth={depth + 1} />
        ))}
      </ul>
    );
  }

  return (
    <li key={node.getName()}>
      <DirTreeItem
        node={node}
        depth={depth}
        isExpanded={isExpanded}
        onClick={() => setIsExpanded((prev) => !prev)}
      />
      {isExpanded && (
        <ul>
          {sortNodes(node.getChildren()).map((child) => (
            <DirTree key={child.getName()} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Explorer() {
  const { tree } = useContext(FileTreeContext);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center min-h-9 px-4 py-2 text-sm leading-none">
        <span className="m-0 inline-flex items-center uppercase">Explorer</span>
        <div>
          <NewFileDialog />
        </div>
      </div>
      <Separator />
      <div className="flex-grow">
        <DirTree node={tree} />
      </div>
    </div>
  );
}
