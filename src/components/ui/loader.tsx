import { LoaderCircle } from "lucide-react";

export const Loader = () => (
    <div className="h-full w-full flex justify-center items-center">
        <LoaderCircle className="w-8 h-8 animate-spin" />
    </div>
);
