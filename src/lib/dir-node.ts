import { AbstractNode, NodeType } from "./abstract-node";
import { FileNode } from "./file-node";

export class DirNode extends AbstractNode {
  getOrCreateDirChild(id: number, name: string) {
    if (this.children.has(name)) {
      const node = this.children.get(name);

      if (node instanceof DirNode) {
        return node;
      }
    }

    const node = new DirNode(id, name, this.level + 1, this);
    this.addChild(node);

    return node;
  }

  getOrCreateFileChild(id: number, name: string) {
    const node = new FileNode(id, name, this.level, this);
    this.addChild(node);

    return node;
  }

  nodeType() {
    return NodeType.DIR;
  }
}
