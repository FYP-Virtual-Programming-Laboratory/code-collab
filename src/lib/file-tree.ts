import { editor, Uri } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { ignore } from "./utils";
import { awareness, yDoc } from "./y-objects";

export type NodeType = "file" | "dir";

export const NodeType = {
  FILE: "file",
  DIR: "dir",
} as const;

/**
 * Abstract class representing a node in a tree structure.
 * Each node can have children and a parent, and provides methods to manage these relationships.
 */
export abstract class Node {
  /**
   * Map to store child nodes, keyed by their name.
   */
  protected children: Map<string, Node> = new Map();
  /**
   * A record that holds metadata information.
   * The keys are strings and the values can be of any type.
   */
  public meta: Record<string, unknown> = {};
  /**
   * A unique identifier for the node.
   */
  private readonly id: string;

  /**
   * Creates an instance of Node.
   * @param name - The name of the node.
   * @param parent - The parent node, if any.
   */
  constructor(
    protected readonly name: string,
    protected parent: Node | null = null
  ) {
    this.id = Math.random().toString(36).substring(2, 9);
  }

  /**
   * Gets the unique identifier of the node.
   * @returns The unique identifier of the node.
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the name of the node.
   * @returns The name of the node.
   */
  getName() {
    return this.name;
  }

  /**
   * Gets the path of the node.
   * @returns The path of the node.
   * @example "root/dir1/dir2/file.ext"
   */
  getPath(): string {
    if (this.parent === null) {
      return "";
    }

    return this.parent.getPath() + "/" + this.name;
  }

  /**
   * Gets the parent of the node.
   * @returns The parent node, or null if there is no parent.
   */
  getParent() {
    return this.parent || null;
  }

  /**
   * Sets the parent of the node.
   * @param parent - The new parent node, or null to remove the parent.
   */
  setParent(parent: Node | null) {
    this.parent = parent;
  }

  /**
   * Adds a child node.
   * @param node - The child node to add.
   * @throws Will throw an error if a child with the same name already exists.
   */
  addChild(node: Node) {
    if (this.children.has(node.name)) {
      throw new Error(`Child with name ${node.name} already exists`);
    }

    this.children.set(node.name, node);
    node.setParent(this);
  }

  /**
   * Removes a child node.
   * @param node - The child node to remove.
   */
  removeChild(node: Node) {
    this.children.delete(node.name);
    node.setParent(null);
  }

  /**
   * Gets a child node by name.
   * @param name - The name of the child node to get.
   * @returns The child node, or undefined if no child with the given name exists.
   */
  getChild(name: string) {
    return this.children.get(name);
  }

  /**
   * Gets all child nodes.
   * @returns An array of all child nodes.
   */
  getChildren() {
    return Array.from(this.children.values());
  }

  /**
   * Adds multiple child nodes.
   * @param nodes - An array of child nodes to add.
   * @throws Will throw an error if a child with the same name already exists.
   */
  addChildren(nodes: Node[]) {
    nodes.forEach((node) => {
      if (this.children.has(node.name)) {
        throw new Error(`Child with name ${node.name} already exists`);
      }

      this.children.set(node.name, node);
      node.setParent(this);
    });
  }

  nodeType(): NodeType {
    if (this instanceof FileNode) {
      return NodeType.FILE;
    } else if (this instanceof DirNode) {
      return NodeType.DIR;
    } else {
      throw new Error("Unknown node type");
    }
  }
}

/**
 * Represents a file node in the explorer.
 * Extends the base Node class and includes file-specific functionality.
 */
export class FileNode extends Node {
  private readonly binding: MonacoBinding;

  /**
   * Creates an instance of FileNode. 
   
   * @param name - The name of the file node.
   * @param content - The content of the file node.
   * @param parent - The optional parent node.
   */
  constructor(name: string, private readonly content: string, parent?: Node) {
    super(name, parent);

    const uri = Uri.parse("file://" + this.getPath());

    const model =
      editor.getModel(uri) ?? editor.createModel(content, undefined, uri);

    yDoc.getText(this.getPath()).insert(0, content);

    this.binding = new MonacoBinding(
      yDoc.getText(this.getPath()),
      model,
      undefined,
      awareness
    );
  }

  /**
   * Retrieves the current binding.
   *
   * @returns The current binding.
   */
  getBinding() {
    return this.binding;
  }

  /**
   * Retrieves the content of the file node.
   * @returns The content of the file node.
   */
  getContent() {
    return this.content;
  }

  /**
   * Throws an error as file nodes cannot have children.
   * @param node - The node to add.
   * @throws Error when attempting to add a child to a file node.
   */
  addChild(node: Node) {
    ignore(node);
    throw new Error("Cannot add child to a file node");
  }

  /**
   * Throws an error as file nodes cannot have children.
   * @param node - The node to remove.
   * @throws Error when attempting to remove a child from a file node.
   */
  removeChild(node: Node): void {
    ignore(node);
    throw new Error("Cannot remove child from a file node");
  }
}

export class DirNode extends Node {
  getOrCreateDirChild(name: string) {
    if (this.children.has(name)) {
      const node = this.children.get(name);

      if (node instanceof DirNode) {
        return node;
      }
    }

    const node = new DirNode(name);
    this.addChild(node);

    return node;
  }

  getOrCreateFileChild(name: string, content: string) {
    const node = new FileNode(name, content, this);
    this.addChild(node);

    return node;
  }
}

export function createFileTree(files: { name: string; content: string }[]) {
  const rootNode = new DirNode("");

  files.forEach((file) => {
    const parts = file.name.split("/");
    let currentNode = rootNode;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        currentNode.getOrCreateFileChild(part, file.content);
      } else {
        currentNode = currentNode.getOrCreateDirChild(part);
      }
    }
  });

  return rootNode;
}

export function initFileCache(root: DirNode) {
  const cache: Record<string, FileNode> = {};

  function traverse(node: Node) {
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
export function sortNodes(nodes: Node[]) {
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
