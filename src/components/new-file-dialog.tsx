import { NEW_FILE } from "@/gql/mutations";
import { useMutation } from "@apollo/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export function NewFileDialog() {
  const [fileName, setFileName] = useState("");

  const newFileMutation = useMutation(NEW_FILE);

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-gray-300 p-1">
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="File Name"
            value={fileName}
            onChange={(ev) => setFileName(ev.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
