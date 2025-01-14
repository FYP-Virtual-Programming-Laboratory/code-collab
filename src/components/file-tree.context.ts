import { DirNode, FileNode } from "@/lib/file-tree";
import { createContext } from "react";

export const FileTreeContext = createContext<{
  tree: DirNode;
  cache: Record<string, FileNode>;
}>({ tree: new DirNode("/"), cache: {} });
