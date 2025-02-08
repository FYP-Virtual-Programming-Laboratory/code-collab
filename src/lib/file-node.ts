import { Uri, editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { AbstractNode, NodeType } from "./abstract-node";
import { DirNode } from "./dir-node";
import { ignore } from "./utils";
import { awareness, yDoc } from "./y-objects";

/**
 * Represents a file node in the explorer.
 * Extends the base Node class and includes file-specific functionality.
 */

export class FileNode extends AbstractNode {
  private readonly binding: MonacoBinding;

  /**
   * Creates an instance of FileNode.
   
   * @param name - The name of the file node.
   * @param parent - The optional parent node.
   */
  constructor(id: number, name: string, level: number, parent: AbstractNode) {
    super(id, name, level, parent);

    const uri = Uri.parse("file://" + this.getPath());

    const model =
      editor.getModel(uri) ?? editor.createModel("", undefined, uri);

    yDoc.getText(this.getPath());

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
    return this.binding.ytext.toString();
  }

  /**
   * Throws an error as file nodes cannot have children.
   * @param node - The node to add.
   * @throws Error when attempting to add a child to a file node.
   */
  addChild(node: AbstractNode) {
    ignore(node);
    throw new Error("Cannot add child to a file node");
  }

  /**
   * Throws an error as file nodes cannot have children.
   * @param node - The node to remove.
   * @throws Error when attempting to remove a child from a file node.
   */
  removeChild(node: AbstractNode): void {
    ignore(node);
    throw new Error("Cannot remove child from a file node");
  }

  nodeType() {
    return NodeType.FILE;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOrCreateDirChild(_id: number, _name: string): DirNode {
    throw new Error("File nodes cannot have children");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOrCreateFileChild(_id: number, _name: string, _content: string): FileNode {
    throw new Error("File nodes cannot have children");
  }
}
