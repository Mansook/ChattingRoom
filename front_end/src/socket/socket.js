import io from "socket.io-client";

//export const socket = io("localhost:8000");


export const socket = io("https://6f52-112-150-250-55.ngrok-free.app",{
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
