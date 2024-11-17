import { pcConfig } from "@/config/config";
import { Socket } from "socket.io-client";
import { readAndSendFile } from "./readAndSendFile";
import { initIncomingDataManager } from "./incomingDataManager";

let pc: RTCPeerConnection | null = null;
let dc: RTCDataChannel | null = null;
let file: File | null = null;
let to: string = "";
let from: string = "";
let socket: Socket;
let fileTransferCallBack: (fileTransferState: InFlightFileState) => void;
let dcOpenCallBack: () => void;
let dcCloseCallBack: () => void;
let isAvailableForTransfer = true;

let end: NodeJS.Timeout;

const TTL: number = 10000;

const sendSignal = (
    event: string,
    data: P2POffer | P2PAnswer | RTCIceCandidate | null
) => {
    socket.emit(event, {
        to,
        from,
        event,
        data,
    });
};

const initSignal = (incomingSocket: Socket) => {
    socket = incomingSocket;
};

const initFile = (incomingFile: File) => {
    file = incomingFile;
};

const initTransferCallbacks = (
    newFileTransferCallBack: (fileTransferState: InFlightFileState) => void,
    newDcOpenCallBack: () => void,
    newDcCloseCallBack: () => void
) => {
    fileTransferCallBack = newFileTransferCallBack;
    dcOpenCallBack = newDcOpenCallBack;
    dcCloseCallBack = newDcCloseCallBack;
};

const initTransfer = async (transaction: Transaction, isSender: boolean) => {
    if (!isAvailableForTransfer) return;
    console.log("initTransfer");
    isAvailableForTransfer = false;

    const done = () => {
        isAvailableForTransfer = true;
        socket.off("offer");
        socket.off("answer");
        socket.off("add-ice-candidates");
        dc?.close();
        pc?.close();
        pc = null;
        dc = null;
        dcCloseCallBack();
    };

    pc = new RTCPeerConnection(pcConfig);
    dc = pc.createDataChannel("data-stream");

    const handleDataChannelOpen = () => {
        console.log("handleDataChannelOpen");
        clearTimeout(end);
        dc?.send("dc-open");
        dcOpenCallBack();
        if (isSender && dc && file) {
            readAndSendFile(file, dc);
        }
    };
    const handleDataChannelError = () => {
        done();
    };
    const handleDataChannelClose = () => {
        done();
    };
    const handleDataChannelMessage = initIncomingDataManager(
        pc,
        dc,
        fileTransferCallBack
    );

    const handleChannelCallback = (event: RTCDataChannelEvent) => {
        dc = event.channel;
        dc.onmessage = handleDataChannelMessage;
        dc.onerror = handleDataChannelError;
        dc.onclose = handleDataChannelClose;
        dc.onopen = handleDataChannelOpen;
    };
    pc.ondatachannel = (event: RTCDataChannelEvent) => {
        handleChannelCallback(event);
    };
    dc.onerror = handleDataChannelError;
    dc.onclose = handleDataChannelClose;
    dc.onopen = handleDataChannelOpen;
    pc.onicecandidate = handleOnIceCandidate;

    to = transaction.from;
    from = transaction.to;
    socket.on("offer", (transaction: Transaction) => {
        handleOnOffer(transaction.data);
    });
    socket.on("answer", (transaction: Transaction) => {
        handleOnAnswer(transaction.data);
    });
    socket.on("add-ice-candidates", (transaction: Transaction) => {
        handleOnCandidate(transaction.data);
    });

    end = setTimeout(() => {
        console.log("timeout", pc?.connectionState);
        done();
    }, TTL);

    if (isSender) {
        pc.onnegotiationneeded = handleNegotiationNeeded;
    } else {
        sendSignal("init-transfer-sender", null);
    }
};

const handleNegotiationNeeded = async () => {
    console.log("handleNegotiationNeeded", pc?.connectionState);
    if (pc && pc.connectionState == "new" && !pc.currentLocalDescription) {
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };
        sendSignal("offer", offer);
    }
};

const handleOnIceCandidate = async (event: RTCPeerConnectionIceEvent) => {
    console.log("handleOnIceCandidate", pc?.connectionState);
    if (event.candidate) {
        sendSignal("add-ice-candidates", event.candidate);
    }
};

const handleOnOffer = async (offer: P2POffer) => {
    console.log("handleOnOffer", pc?.connectionState);
    if (pc && pc.connectionState == "new" && !pc.currentRemoteDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
        const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type,
        };
        sendSignal("answer", answer);
    }
};

const handleOnAnswer = async (answer: P2PAnswer) => {
    console.log("handleOnAnswer", pc?.connectionState);
    if (pc && pc.connectionState == "new") {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
};

const handleOnCandidate = async (candidate: RTCIceCandidate) => {
    console.log("handleOnCandidate", pc?.connectionState);
    setTimeout(() => {
        pc?.addIceCandidate(candidate);
    }, 1000);
};

export { initSignal, initTransfer, initFile, initTransferCallbacks };
