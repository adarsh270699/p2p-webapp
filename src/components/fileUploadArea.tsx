import { Button } from "./ui/button";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { File, ArrowUpToLine } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
interface Props {
  isDisabled: boolean;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export const FileUploadArea = ({ isDisabled, file, setFile }: Props) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  }

  return (
    <Button disabled={isDisabled} className="h-full w-full p-0 rounded-lg">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
      >
        <div className="w-2/3 h-full flex flex-col items-center justify-center p-4">
          <div className="h-20 w-20 rounded-lg flex items-center justify-center mb-2">
            {file ? (
              <File className="w-16 h-16 text-blue-600" />
            ) : (
              <ArrowUpToLine className="w-16 h-16 text-blue-600" />
            )}
          </div>

          <p className="mb-2 text-sm truncate w-full">
            {file ? (
              <span>{file.name}</span>
            ) : (
              <span>
                <span className="">Click To Upload</span>
              </span>
            )}
          </p>
        </div>
        <Input
          id="dropzone-file"
          type="file"
          onChange={handleChange}
          className="hidden"
        />
      </Label>
    </Button>
  );
};
