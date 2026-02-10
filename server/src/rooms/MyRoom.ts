import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

// list of avatars
const avatars = ['glady', 'dino', 'bean', 'bag', 'btfly', 'bobo', 'ghostiny', 'ghosty', 'mark'];

export class MyRoom extends Room {
  maxClients = 4;
  state = new MyRoomState();
  
  /**
   * Handle messages from clients
   */
  messages = {
    move: (client: Client, message: any) => {
      const player = this.state.players.get(client.sessionId);
      player.x = message.x;
      player.y = message.y;
    },
    type: (client: Client, message: any) => {
      //
      // handle "type" message
      //
    }
  }

  onCreate (options: any) {
    // room created!
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const player = new Player();
    player.x = Math.floor(Math.random() * 400);
    player.y = Math.floor(Math.random() * 400);
    player.sessionId = client.sessionId;
    // get a random avatar for the player
    player.avatar = avatars[Math.floor(Math.random() * avatars.length)];

    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client, code: number) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
