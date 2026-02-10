import { Client } from "@colyseus/sdk";

export const colyseusSDK = new Client(`${location.protocol}//${location.host}/colyseus`);

