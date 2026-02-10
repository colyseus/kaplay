import { k } from "../App";

import { Callbacks, Room } from "@colyseus/sdk";
import type { MyRoomState, Player } from "../../../server/src/rooms/schema/MyRoomState";

export function createLobbyScene() {
  k.scene("lobby", (room: Room<MyRoomState>) => {
    const callbacks = Callbacks.get(room);

    // keep track of player sprites
    const spritesBySessionId: Record<string, any> = {};

    // listen when a player is added on server state
    callbacks.onAdd("players", (player, sessionId) => {
      spritesBySessionId[sessionId] = createPlayer(player);
    });

    // listen when a player is removed from server state
    callbacks.onRemove("players", (player, sessionId) => {
      k.destroy(spritesBySessionId[sessionId]);
    });

    k.onClick(() => {
      room.send("move", k.mousePos());
    });

  });
}

function createPlayer(player: Player) {
  k.loadSprite(player.avatar, `assets/${player.avatar}.png`);

  // Add player sprite
  const sprite = k.add([
    k.sprite(player.avatar),
    k.pos(player.x, player.y),
    k.anchor("center"),
    k.scale(0.5)
  ]);

  sprite.onUpdate(() => {
    sprite.pos.x = k.lerp(sprite.pos.x, player.x, 12 * k.dt());
    sprite.pos.y = k.lerp(sprite.pos.y, player.y, 12 * k.dt());
  });

  return sprite;
}
