export const initIncomingDataManager = function (
    pc: RTCPeerConnection,
    dc: RTCDataChannel,
    fileTransferCallBack: (fileTransferState: FileTransferState) => void
) {
    const chunkSize: number = 16 * 1024; // 16KB chunks for better performance

    let fileInfo = {
        size: 0,
        startTime: 0,
        endTime: 0,
        type: "",
        name: "",
        chunks: [] as ArrayBuffer[],
        totalPackets: 0,
        receivedPackets: 0,
        percent: 0,
        speed: 0,
    };

    const downloadFile = () => {
        const blob = new Blob(fileInfo.chunks, {
            type: fileInfo.type,
        });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.setAttribute("download", fileInfo.name);
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
                    fileInfo = {
                        size: 0,
                        startTime: Date.now(),
                        endTime: 0,
                        type: "",
                        name: "",
                        chunks: [],
                        totalPackets: 0,
                        receivedPackets: 0,
                        percent: 0,
                        speed: 0,
                    };
                    break;

                case "fileType":
                    dc.send(`ack-filetype;${value}`);
                case "ack-filetype":
                    fileInfo.type = value;
                    break;

                case "fileName":
                    dc.send(`ack-filename;${value}`);
                case "ack-filename":
                    fileInfo.name = value;
                    break;

                case "size":
                    dc.send(`ack-size;${value}`);
                case "ack-size":
                    fileInfo.size = parseInt(value, 10);
                    fileInfo.totalPackets = Math.ceil(
                        fileInfo.size / chunkSize
                    );
                    break;
                case "ack-percent":
                    fileInfo.percent = parseFloat(value);
                    break;
                case "ack-end":
                    fileInfo.endTime = parseInt(value, 10);
                    break;
            }
        } else {
            fileInfo.chunks.push(data);
            fileInfo.receivedPackets++;

            fileInfo.percent =
                (fileInfo.receivedPackets / fileInfo.totalPackets) * 100;
            fileInfo.speed =
                ((fileInfo.receivedPackets * chunkSize) /
                    (Date.now() - fileInfo.startTime)) *
                1000;

            dc.send(`ack-percent;${fileInfo.percent}`);

            if (fileInfo.chunks.length * chunkSize >= fileInfo.size) {
                fileInfo.endTime = Date.now();
                dc.send(`ack-end;${fileInfo.endTime}`);
                downloadFile();
                setTimeout(() => {
                    dc.close();
                    pc.close();
                }, 1000);
            }
        }
        fileTransferCallBack(fileInfo);
    };

    return handleDataChannelMessageReceived;
};
