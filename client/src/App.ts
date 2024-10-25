import './index.css';
import kaplay from 'kaplay'
import { createLobbyScene } from './scenes/lobby';
import { colyseusSDK } from "./core/colyseus";
import type { MyRoomState } from '../../server/src/rooms/schema/MyRoomState';

// Initialize kaplay
export const k = kaplay({ background: "20252e" });

// Create all scenes
createLobbyScene();

async function main() {

  const text = k.add([
    k.text("Joining room ..."),
    k.pos(k.center()),
    k.anchor("center")
  ]);

  const room = await colyseusSDK.joinOrCreate<MyRoomState>("my_room", {
    name: "Ka"
  });

  text.text = "Success! sessionId: " + room.sessionId;

  k.go("lobby", room);
}

main();