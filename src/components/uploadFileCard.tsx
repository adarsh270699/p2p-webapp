import { FileUploadArea } from "./fileUploadArea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Dispatch, SetStateAction } from "react";

interface Props {
    roomState: RoomState | undefined;
    isUploadDisabled: boolean;
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
}

export const UploadFileCard = ({
    roomState,
    isUploadDisabled,
    file,
    setFile,
}: Props) => {
    return (
        <Card className="h-full w-full flex flex-col" isloading={!roomState}>
            <CardHeader className="">
                <CardTitle>Step 2</CardTitle>
                <CardDescription>Upload a file.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <FileUploadArea
                    isDisabled={isUploadDisabled}
                    file={file}
                    setFile={setFile}
                />
            </CardContent>
        </Card>
    );
};
