import io from "socket.io-client";

//export const socket = io("localhost:8000");


export const socket = io("https://port-0-chatserver-1272llx2n6xjr.sel5.cloudtype.app",{
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

