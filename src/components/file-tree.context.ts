import { DirNode } from "@/lib/file-system/dir-node";
import { FileNode } from "@/lib/file-system/file-node";
import { createContext } from "react";

export const FileTreeContext = createContext<{
  tree: DirNode;
  cache: Record<string, FileNode>;
}>({ tree: new DirNode(0, "", 0), cache: {} });
