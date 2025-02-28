import { ExplorerDialogs } from "./explorer/dialogs";
import { DirTree } from "./explorer/dir-tree";
import { FileInformation } from "./explorer/file-information";
import { Separator } from "./ui/separator";

export default function Explorer() {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="flex justify-between items-center min-h-9 px-4 py-2 text-sm leading-none">
        <span className="m-0 inline-flex items-center uppercase">Explorer</span>
      </div>
      <Separator />
      <DirTree />
      <FileInformation />
      <ExplorerDialogs />
    </div>
  );
}
