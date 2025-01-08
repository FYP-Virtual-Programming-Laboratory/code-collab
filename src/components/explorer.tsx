import { getFiles } from "@/mocks";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  createFileTree,
  FileNode,
  Node,
  NodeType,
  sortNodes,
} from "../lib/explorer";
import { Separator } from "./ui/separator";

function DirTreeItem({
  node,
  depth,
  isExpanded = false,
  onClick,
}: Readonly<{
  node: Node;
  depth: number;
  isExpanded?: boolean;
  onClick?: () => void;
}>) {
  const padding =
    0.5 + (depth - 1) * 0.5 + (node.nodeType() === NodeType.FILE ? 1.2 : 0);

  return (
    <button
      className="inline-flex gap-1 items-center hover:bg-gray-300 w-full py-0.5"
      style={{ paddingLeft: `${padding}em` }}
      onClick={onClick}
    >
      {node.nodeType() === NodeType.DIR && (
        <>{isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}</>
      )}
      {node.getName()}
    </button>
  );
}

function DirTree({
  node,
  depth = 0,
}: Readonly<{ node: Node; depth?: number }>) {
  const [isExpanded, setIsExpanded] = useState(
    !!node.meta.lastIsExpanded || false
  );

  useEffect(() => {
    return () => {
      node.meta.lastIsExpanded = isExpanded;
    };
  }, [isExpanded, node.meta]);

  if (node instanceof FileNode) {
    return (
      <li key={node.getName()}>
        <DirTreeItem node={node} depth={depth} />
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
  return (
    <div className="">
      <h1 className="uppercase px-4 py-2 text-sm leading-none">Explorer</h1>
      <Separator />
      <ul>
        <DirTree node={createFileTree(getFiles())} />
      </ul>
    </div>
  );
}
