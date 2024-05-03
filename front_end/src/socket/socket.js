import io from "socket.io-client";

export const socket = io("https://9d38-112-150-250-55.ngrok-free.app",{
    withCredentials: true,
});
