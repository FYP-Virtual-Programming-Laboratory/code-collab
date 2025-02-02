import { DirNode } from "@/lib/dir-node";
import { FileNode } from "@/lib/file-node";
import { createContext } from "react";

export const FileTreeContext = createContext<{
  tree: DirNode;
  cache: Record<string, FileNode>;
}>({ tree: new DirNode(0, "", 0), cache: {} });
