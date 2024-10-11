import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <div className="mt-auto w-full flex flex-row justify-center gap-2 p-2 text-muted-foreground">
      <a
        className="hover:underline space-x-1"
        href="https://github.com/adarsh270699/p2p-webapp"
        target="_blank"
      >
        <GitHubLogoIcon className="w-4 h-4 inline" />
        <span>web app</span>
      </a>

      <a
        className="hover:underline space-x-1"
        href="https://github.com/adarsh270699/p2p-signal-service"
        target="_blank"
      >
        <GitHubLogoIcon className="w-4 h-4 inline" />
        <span>signaling service</span>
      </a>
    </div>
  );
};
