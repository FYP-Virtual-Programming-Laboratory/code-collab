import { YObjects } from "@/contexts/y-objects-context";
import { AbstractNode } from "./abstract-node";
import { DirNode } from "./dir-node";
import { FileNode } from "./file-node";

export function buildTree(
  files: { id: number; path: string; content: string }[],
  yObjects: YObjects
) {
  const rootNode = new DirNode(0, "", 0);

  files.forEach((file) => {
    const parts = file.path.split("/");
    let currentNode = rootNode;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        currentNode.getOrCreateFileChild(file.id, part, yObjects);
      } else {
        currentNode = currentNode.getOrCreateDirChild(file.id, part);
      }
    }
  });

  return rootNode;
}

// const NODE_CACHE: Record<string, AbstractNode> = {};

export function updateTree(
  fileTree: DirNode,
  files: {
    id: number;
    path: string;
    content: string;
  }[],
  yObjects: YObjects
) {
  const visited = new Set<string>();

  files.forEach((file) => {
    const parts = file.path.split("/");
    let currentNode = fileTree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        const fileNode = currentNode.getOrCreateFileChild(
          file.id,
          part,
          yObjects
        );
        visited.add(fileNode.getPath());
      } else {
        currentNode = currentNode.getOrCreateDirChild(file.id, part);
      }
    }
  });

  // Remove files that are no longer present in the project.
  dfsTraversal(fileTree, (node) => {
    if (node instanceof FileNode && !visited.has(node.getPath())) {
      node.getParent()?.removeChild(node);
    }
  });

  return fileTree;
}

export function initFileCache(root: DirNode) {
  const cache: Record<number, FileNode> = {};

  dfsTraversal(root, (node) => {
    if (node instanceof FileNode) {
      cache[node.getId()] = node;
    }
  });

  return cache;
}

/* TODO: Improve by using better suited data structure in `Node` class. */
export function sortNodes(nodes: AbstractNode[]) {
  return nodes.sort((a, b) => {
    if (a instanceof FileNode && b instanceof DirNode) {
      return 1;
    } else if (a instanceof DirNode && b instanceof FileNode) {
      return -1;
    } else {
      return a.getName().localeCompare(b.getName());
    }
  });
}

function dfsTraversal(node: AbstractNode, cb: (node: AbstractNode) => void) {
  cb(node);
  node.getChildren().forEach((child) => dfsTraversal(child, cb));
}
