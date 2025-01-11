import { DirNode, Node } from "@/lib/file-tree";
import { createContext } from "react";

export const FileTreeContext = createContext<{
  tree: DirNode;
  cache: Record<string, Node>;
}>({ tree: new DirNode("/"), cache: {} });
