const pcConfig: RTCConfiguration = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const socketConfig = {
    baseUrl: "https://p2p-signal-service.onrender.com/",
    options: {},
};

const serviceConfig = {
    baseUrl: "https://p2p-signal-service.onrender.com/",
};

export { pcConfig, socketConfig, serviceConfig };
