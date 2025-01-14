import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fileActivated,
  fileClosed,
  selectActiveFileIdx,
  selectOpenedFiles,
} from "@/features/opened-files.slice";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useContext } from "react";
import Editor from "./editor";
import { FileTreeContext } from "./file-tree.context";
import { buttonVariants } from "./ui/button";

export default function EditorTabs() {
  const dispatch = useAppDispatch();
  const openedFiles = useAppSelector(selectOpenedFiles);
  const activeFileIdx = useAppSelector(selectActiveFileIdx);
  const { cache } = useContext(FileTreeContext);

  const activeFile =
    activeFileIdx !== null ? cache[openedFiles[activeFileIdx]] : null;

  return (
    <div className="w-full">
      <div className="inline-flex items-center text-muted-foreground w-full justify-start border-b h-9">
        {openedFiles
          .map((id) => cache[id])
          .map((node, idx) => (
            <div key={node.getId()} className="relative flex items-center">
              <button
                data-state={idx === activeFileIdx ? "active" : "inactive"}
                className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1 h-full border-x text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-200 data-[state=active]:text-foreground data-[state=active] pr-8 relative"
                onClick={() => {
                  dispatch(fileActivated({ index: idx }));
                }}
              >
                {node.getName()}
              </button>
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-auto h-auto",
                  "absolute right-2"
                )}
                title={`Close ${node.getPath()}`}
                onClick={() => {
                  dispatch(fileClosed({ index: idx }));
                }}
              >
                <X size={"1em"} />
              </button>
            </div>
          ))}
      </div>
      <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Editor file={activeFile} />
      </div>
    </div>
  );
}
