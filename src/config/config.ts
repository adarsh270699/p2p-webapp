const stunServers = [
    "stun.l.google.com:19302",
    "stun1.l.google.com:19302",
    "stun2.l.google.com:19302",
    "stun3.l.google.com:19302",
    "stun4.l.google.com:19302",
];

const pcConfig: RTCConfiguration = {
    iceServers: [],
};

for (const server of stunServers) {
    pcConfig.iceServers?.push({
        urls: `stun:${server}`,
    });
}

const socketConfig = {
    baseUrl: "https://p2p-signal-service.onrender.com/",
    options: {},
};

const serviceConfig = {
    baseUrl: "https://p2p-signal-service.onrender.com/",
};

export { pcConfig, socketConfig, serviceConfig };
