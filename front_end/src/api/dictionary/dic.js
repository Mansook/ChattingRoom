import { KEY } from "../../source/token";
import client from "../client";

export const findWordInDic = ({ word }) =>
  client.get(`/api/search?key=${KEY}&q=${word}`);
