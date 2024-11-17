import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import { RootState } from "@/store/store";
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

export function TransferDrawer() {
    const ftState = useSelector((state: RootState) => {
        return state.ft;
    });

    return (
        <Drawer open={ftState.isDcConnected}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent className=" bg-black border-zinc-800 w-full border">
                <div className="w-full flex flex-col">
                    <DrawerHeader>
                        <DrawerTitle className="mx-auto text-white justify-between">
                            Transfer Progress
                        </DrawerTitle>
                        <DrawerDescription className="mx-auto">
                            {ftState.inFlightFileState.percent.toFixed(2)}%
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className=" mx-auto w-full flex justify-center">
                        <Progress
                            className="w-[90%] h-2 text-white"
                            value={parseFloat(
                                ftState.inFlightFileState.percent.toFixed(2)
                            )}
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
