import { Client } from "colyseus.js";

export const colyseusSDK = new Client(`${location.protocol}//${location.host}/colyseus`);

