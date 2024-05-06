import io from "socket.io-client";

export const socket = io("localhost:8000");

/*
export const socket = io("https://93d5-2001-2d8-ef4b-3bb0-cd4f-d967-6d55-8d92.ngrok-free.app",{
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
*/