import { Progress } from "@/components/ui/progress";
export const StatusBar = () => {
    return (
        <div className="col-span-4 h-16">
            <div className="h-full w-full flex space-x-2 ">
                <Progress
                    className=" m-auto rounded-lg h-full w-full"
                    value={12}
                />
            </div>
        </div>
    );
};
