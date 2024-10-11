export const Header = () => {
  return (
    <div className="mb-0 mt-20 w-full flex items-center text-wrap">
      <div className="container mt-auto mx-auto">
        <div className="flex flex-col gap-1 p-2">
          <h1 className="text-5xl font-bold">
            <span>Send Files&nbsp;</span>
            <span className=" bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Peer to Peer.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Fast and with no limits.
          </p>
        </div>
      </div>
    </div>
  );
};
