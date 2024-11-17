import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { File, ArrowUpToLine } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { setIsFileSelected } from "@/store/slices/ftSlice";
import { initFile } from "@/lib/dcTransfer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export const FileUploadArea = () => {
    const ftState = useSelector((state: RootState) => {
        return state.ft;
    });

    const dispatch = useDispatch<AppDispatch>();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files?.[0]) {
            initFile(event.target.files[0]);
            dispatch(
                setIsFileSelected({
                    flag: true,
                    data: {
                        name: event.target.files[0].name,
                        type: event.target.files[0].type,
                        lastModified: event.target.files[0].lastModified,
                        size: event.target.files[0].size,
                    },
                })
            );
        } else {
            dispatch(
                setIsFileSelected({
                    flag: false,
                    data: {
                        name: "",
                        type: "",
                        lastModified: 0,
                        size: 0,
                    },
                })
            );
        }
    }

    return (
        <Button
            disabled={!ftState.selectedPeer}
            className="h-full w-full p-0 rounded-lg"
        >
            <Label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
                <div className="w-2/3 h-full flex flex-col items-center justify-center p-4">
                    <div className="h-20 w-20 rounded-lg flex items-center justify-center mb-2">
                        {ftState.isFileSelected ? (
                            <File className="w-16 h-16 text-blue-600" />
                        ) : (
                            <ArrowUpToLine className="w-16 h-16 text-blue-600" />
                        )}
                    </div>

                    <p className="mb-2 text-sm truncate w-full">
                        {ftState.isFileSelected ? (
                            <span>{ftState.fileMetaData.name}</span>
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
