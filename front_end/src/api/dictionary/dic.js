import { KEY } from "../../source/token";
import client from "../client";

export const findWordInDic = ({ word }) =>
  client.post(`/api/search?key=${KEY}&q=${word}`);
