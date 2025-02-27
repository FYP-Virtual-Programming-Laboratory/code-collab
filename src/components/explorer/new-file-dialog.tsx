import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectProject } from "@/features/global.slice";
import { fileOpened } from "@/features/opened-files.slice";
import { NEW_FILE } from "@/gql/mutations";
import { useMutation } from "@apollo/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export function NewFileDialog() {
  const project = useAppSelector(selectProject);
  const projectId = project?.id;
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const dispatch = useAppDispatch();

  const [newFile] = useMutation(NEW_FILE, {
    awaitRefetchQueries: true,
    refetchQueries: ["ListFiles"],
    onCompleted: (data) => {
      setFileName("");
      dispatch(fileOpened({ fileId: data.newFile.id }));
    },
    onError: (error) => {
      setFileName("");
      console.error(error);
    },
  });

  const handleSubmit = () => {
    setOpen(false);

    if (fileName.trim() === "") {
      console.error("File name cannot be empty.");
      return;
    }

    if (!projectId) return;

    newFile({ variables: { filePath: fileName, projectId } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger className="hover:bg-gray-300 p-1">
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter the file path of the new file.
        </DialogDescription>
        <div className="py-4">
          <Input
            placeholder="File Name"
            value={fileName}
            onChange={(ev) => setFileName(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
