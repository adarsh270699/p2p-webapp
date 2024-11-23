export const initIncomingDataManager = function (
  pc: RTCPeerConnection,
  dc: RTCDataChannel,
  fileTransferCallBack: (fileTransferState: InFlightState) => void
) {
  const chunkSize: number = 16 * 1024;
  let startTime = 0;
  let endTime = 0;
  const chunks = [] as ArrayBuffer[];
  let inFlightState: InFlightState = {
    name: "",
    size: 0,
    type: "",
    receivedPackets: 0,
    totalPackets: 0,
    percent: 0,
    speed: 0,
  };

  const downloadFile = () => {
    const blob = new Blob(chunks, {
      type: inFlightState.type,
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", inFlightState.name);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const handleDCMessageReceived = (event: MessageEvent) => {
    const data = event.data;
    if (typeof data === "string") {
      const [key, value] = data.split(";");
      console.log(key, value);
      switch (key) {
        case "start":
          dc.send(`ack-start;${value}`);
        case "ack-start":
          startTime = new Date().getTime();
        case "ack-status":
          try {
            const updatedState = JSON.parse(value);
            inFlightState = {
              ...inFlightState,
              ...updatedState,
            };
          } catch {}
          break;

        case "ack-end":
          endTime = parseInt(value, 10);
          break;
      }
    } else {
      chunks.push(data);
      // increase recieved packet count
      inFlightState.receivedPackets++;

      // calculate percentage of progress
      inFlightState.percent =
        (inFlightState.receivedPackets / inFlightState.totalPackets) * 100;

      // calculate avg speed
      inFlightState.speed =
        (inFlightState.receivedPackets * chunkSize) /
        1024 /
        1024 /
        ((new Date().getTime() - startTime) / 1000);

      // send acknowedgment
      dc.send(`ack-status;${JSON.stringify(inFlightState)}`);

      if (chunks.length * chunkSize >= inFlightState.size) {
        endTime = Date.now();
        dc.send(`ack-end;${endTime}`);
        downloadFile();
        setTimeout(() => {
          dc.close();
          pc.close();
        }, 1000);
      }
    }

    fileTransferCallBack(inFlightState);
  };

  return handleDCMessageReceived;
};
