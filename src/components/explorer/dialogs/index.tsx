import { DeleteFileDialog } from "./delete-file-dialog";
import { NewFileDialog } from "./new-file-dialog";

export function ExplorerDialogs() {
  return (
    <div>
      <NewFileDialog />
      <DeleteFileDialog />
    </div>
  );
}
