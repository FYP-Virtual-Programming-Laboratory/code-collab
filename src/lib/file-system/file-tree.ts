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

// function diffTree(oldTree: DirNode, newTree: DirNode) {}

export function initFileCache(root: DirNode) {
  const cache: Record<number, FileNode> = {};

  function traverse(node: AbstractNode) {
    if (node instanceof FileNode) {
      cache[node.getId()] = node;
    } else {
      node.getChildren().forEach(traverse);
    }
  }

  traverse(root);

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
