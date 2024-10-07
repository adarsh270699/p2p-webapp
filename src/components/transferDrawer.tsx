import { Progress } from "@/components/ui/progress";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface TransferDrawerProps {
    isOpen: boolean;
    fileTransferPercent: number;
}

export function TransferDrawer({
    isOpen,
    fileTransferPercent,
}: TransferDrawerProps) {
    return (
        <Drawer open={isOpen}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent className=" bg-black border-zinc-800 w-full border">
                <div className="w-full flex flex-col">
                    <DrawerHeader>
                        <DrawerTitle className="mx-auto text-white justify-between">
                            Transfer Progress
                        </DrawerTitle>
                        <DrawerDescription className="mx-auto">
                            {fileTransferPercent}%
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className=" mx-auto w-full flex justify-center">
                        <Progress
                            className="w-[90%] h-2 text-white"
                            value={fileTransferPercent}
                        />
                    </div>

                    <DrawerFooter className="flex justify-center w-full">
                        <div className="flex justify-center w-full">
                            <DrawerClose asChild></DrawerClose>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
