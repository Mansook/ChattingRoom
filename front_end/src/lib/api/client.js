import axios from "axios";

const client = axios.create({
    baseURL: "https://port-0-filchatter-1fgm12klx5u6yb5.sel5.cloudtype.app",
});

export default client;