import { DirNode } from "@/lib/file-tree";
import { createContext } from "react";

export const FileTreeContext = createContext<DirNode>(new DirNode("/"));
