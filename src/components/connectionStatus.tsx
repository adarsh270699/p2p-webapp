import { cn } from "@/lib/utils";

export function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  const customClassNames = isConnected ? "text-green-600" : "text-red-600";
  return (
    <div className="flex flex-row">
      <p className="text-sm text-muted-foreground">
        Backend Connection Status:&nbsp;
        <span className={cn("font-bold", customClassNames)}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </p>
    </div>
  );
}
