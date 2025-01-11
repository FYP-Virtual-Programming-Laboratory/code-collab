import { FileNode } from "@/lib/file-tree";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import { X } from "lucide-react";
import { useContext } from "react";
import Editor from "./editor";
import { FileTreeContext } from "./file-tree.context";
import { OpenFilesContext } from "./open-files.context";
import { buttonVariants } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function EditorTabs() {
  const { activeIndex, setActiveIndex, fileIds, closeFile } =
    useContext(OpenFilesContext);
  const { cache } = useContext(FileTreeContext);

  return (
    <Tabs
      className="w-full"
      activationMode="manual"
      value={activeIndex !== null ? activeIndex.toString() : undefined}
      onValueChange={(id) => setActiveIndex(parseInt(id))}
    >
      <TabsList className="w-full justify-start border-b h-9">
        {fileIds
          .map((id) => cache[id])
          .map((node, idx) => (
            <div key={node.getId()} className="relative flex items-center">
              <TabsTrigger
                value={idx.toString()}
                className="pr-8 relative"
                onClick={() => console.log("open file", node.getId())}
              >
                {node.getName()}
              </TabsTrigger>
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-auto h-auto",
                  "absolute right-2"
                )}
                title={`Close ${node.getPath().join("/")}`}
                onClick={() => {
                  console.log("close file", node.getId());
                  return closeFile(node.getId());
                }}
              >
                <X size={"1em"} />
              </button>
            </div>
          ))}
      </TabsList>
      {fileIds
        .map((id) => cache[id])
        .map((node, idx) => (
          <TabsContent key={node.getId()} value={idx.toString()}>
            <Editor initialContent={(node as FileNode).getContent()} />
          </TabsContent>
        ))}
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
