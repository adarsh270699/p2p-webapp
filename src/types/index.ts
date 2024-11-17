/* eslint-disable @typescript-eslint/no-unused-vars */

type Transaction = {
    from: string;
    to: string;
    event: string;
    data: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
};

type Adress = {
    roomId: string;
    peerId: string;
};

type Result = {
    success: boolean;
    data: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
    msg: string | null;
};

type Peer2Peer = {
    pc: RTCPeerConnection;
    dc: RTCDataChannel;
};

type Peer = {
    id: string;
    roomId: string;
    name: string;
    lastActive: string;
    createdAt: string;
};

type Room = {
    id: string;
    peers: { string: Peer };
    lastActive: string;
    createdAt: string;
};

type RoomState = {
    peer: Peer;
    room: Room;
};

type P2POffer = {
    sdp: string | undefined;
    type: RTCSdpType;
};

type P2PAnswer = {
    sdp: string | undefined;
    type: RTCSdpType;
};
type OfferPacket = {
    offer: P2POffer;
    candidates: RTCIceCandidate[];
};

type AnswerPacket = {
    answer: P2PAnswer;
    candidates: RTCIceCandidate[];
};

type P2pDescription = {
    sdp: string | undefined;
    type: RTCSdpType;
};

type DescriptionCandidatePacket = {
    description: P2pDescription;
    candidates: RTCIceCandidate[];
};

type InFlightFileState = {
    name: string;
    size: number;
    type: string;
    receivedPackets: number;
    totalPackets: number;
    percent: number;
    speed: number;
};

type FtState = {
    selectedPeer: string;
    isFileSelected: boolean;
    fileMetaData: FileMetaData;
    isDcConnected: boolean;
    inFlightFileState: InFlightFileState;
};

type FileMetaData = {
    name: string;
    type: string;
    lastModified: number;
    size: number;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
