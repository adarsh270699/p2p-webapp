import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { FileUploadArea } from "./fileUploadArea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export const UploadFileCard = () => {
    const roomState = useSelector((state: RootState) => {
        return state.room;
    });

    return (
        <Card
            className="h-full w-full flex flex-col"
            isloading={!roomState.room.id}
        >
            <CardHeader className="">
                <CardTitle>Step 2</CardTitle>
                <CardDescription>Upload a file.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <FileUploadArea />
            </CardContent>
        </Card>
    );
};
