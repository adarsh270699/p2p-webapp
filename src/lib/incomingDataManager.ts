export const initIncomingDataManager = function (
    pc: RTCPeerConnection,
    dc: RTCDataChannel,
    fileTransferCallBack: (fileTransferState: InFlightFileState) => void
) {
    const chunkSize: number = 16 * 1024;
    let startTime = 0;
    let endTime = 0;
    let chunks = [] as ArrayBuffer[];
    let inFlightFileState = {
        size: 0,
        type: "",
        name: "",
        totalPackets: 0,
        receivedPackets: 0,
        percent: 0,
        speed: 0,
    };

    const downloadFile = () => {
        const blob = new Blob(chunks, {
            type: inFlightFileState.type,
        });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.setAttribute("download", inFlightFileState.name);
        link.click();
        link.parentNode?.removeChild(link);
    };

    const handleDataChannelMessageReceived = (event: MessageEvent) => {
        const data = event.data;
        if (typeof data === "string") {
            const [key, value] = data.split(";");
            switch (key) {
                case "start":
                    dc.send("ack-start");
                case "ack-start":
                    inFlightFileState = {
                        size: 0,
                        type: "",
                        name: "",
                        totalPackets: 0,
                        receivedPackets: 0,
                        percent: 0,
                        speed: 0,
                    };
                    startTime = Date.now();
                    startTime = 0;
                    chunks = [];
                    break;

                case "fileType":
                    dc.send(`ack-filetype;${value}`);
                case "ack-filetype":
                    inFlightFileState.type = value;
                    break;

                case "fileName":
                    dc.send(`ack-filename;${value}`);
                case "ack-filename":
                    inFlightFileState.name = value;
                    break;

                case "size":
                    dc.send(`ack-size;${value}`);
                case "ack-size":
                    inFlightFileState.size = parseInt(value, 10);
                    inFlightFileState.totalPackets = Math.ceil(
                        inFlightFileState.size / chunkSize
                    );
                    break;
                case "ack-percent":
                    inFlightFileState.percent = parseFloat(value);
                    break;
                case "ack-end":
                    endTime = parseInt(value, 10);
                    break;
            }
        } else {
            chunks.push(data);
            inFlightFileState.receivedPackets++;

            inFlightFileState.percent =
                (inFlightFileState.receivedPackets /
                    inFlightFileState.totalPackets) *
                100;
            inFlightFileState.speed =
                ((inFlightFileState.receivedPackets * chunkSize) /
                    (Date.now() - startTime)) *
                1000;

            dc.send(`ack-percent;${inFlightFileState.percent}`);

            if (chunks.length * chunkSize >= inFlightFileState.size) {
                endTime = Date.now();
                dc.send(`ack-end;${endTime}`);
                downloadFile();
                setTimeout(() => {
                    dc.close();
                    pc.close();
                }, 1000);
            }
        }
        fileTransferCallBack(inFlightFileState);
    };

    return handleDataChannelMessageReceived;
};
