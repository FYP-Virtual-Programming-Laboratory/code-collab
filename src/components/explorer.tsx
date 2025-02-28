import { DeleteFileDialog } from "./explorer/dialogs/delete-file-dialog";
import { NewFileDialog } from "./explorer/dialogs/new-file-dialog";
import { DirTree } from "./explorer/dir-tree";
import { Separator } from "./ui/separator";

export default function Explorer() {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="flex justify-between items-center min-h-9 px-4 py-2 text-sm leading-none">
        <span className="m-0 inline-flex items-center uppercase">Explorer</span>
        <div>
          <NewFileDialog />
        </div>
      </div>
      <Separator />
      <DirTree />
      <DeleteFileDialog />
    </div>
  );
}
