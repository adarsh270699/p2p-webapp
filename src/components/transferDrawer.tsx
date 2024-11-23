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
  const inFlightState = useSelector((state: RootState) => {
    return state.inFlight;
  });
  console.log({ ...inFlightState });

  const ftState = useSelector((state: RootState) => {
    return state.ft;
  });

  return (
    <Drawer open={ftState.isDcConnected}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className=" bg-black border-zinc-800 w-full border">
        <div className="w-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle className="mx-auto text-white text-lg justify-between">
              Transfer Progress
            </DrawerTitle>
            <DrawerDescription className="mx-auto text-center text-zinc-300 my-2">
              <p>
                <span>File Name:&nbsp;</span>
                <span className="text-blue-600">{inFlightState.name}</span>
              </p>
              <p>
                <span>File Size:&nbsp;</span>
                <span className="text-blue-600">
                  {(inFlightState.size / 1024 / 1024).toFixed(2)}MB
                </span>
              </p>
              <p>
                <span>Progres:&nbsp;</span>
                <span className="text-blue-600">
                  {inFlightState.percent.toFixed(2)}%
                </span>
              </p>
              <p>
                <span>Avg. Speed:&nbsp;</span>
                <span className="text-blue-600">
                  {inFlightState.speed.toFixed(2)}MB/s
                </span>
              </p>
            </DrawerDescription>
          </DrawerHeader>

          <div className=" mx-auto w-full flex justify-center">
            <Progress
              className="w-[90%] h-2 text-white"
              value={parseFloat(Math.round(inFlightState.percent).toString())}
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
