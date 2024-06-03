import io from "socket.io-client";

//export const socket = io("localhost:8000");


export const socket = io("ec2-43-201-46-225.ap-northeast-2.compute.amazonaws.com:8000",{
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
