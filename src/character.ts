import {
  characterApproval as characterApprovalEvent,
  characterApprovalForAll as characterApprovalForAllEvent,
  characterAuthorityUpdated as characterAuthorityUpdatedEvent,
  Evolve as EvolveEvent,
  Minted as MintedEvent,
  characterOwnerUpdated as characterOwnerUpdatedEvent,
  SetNickname as SetNicknameEvent,
  characterTransfer as characterTransferEvent,
} from "../generated/character/character";

import { Character } from "../generated/schema";

import { log } from "@graphprotocol/graph-ts";

import { getOrCreateUser, getRarity, getName, getCostLevelUp } from "./utils";

export function handlecharacterApproval(event: characterApprovalEvent): void {}

export function handlecharacterApprovalForAll(
  event: characterApprovalForAllEvent
): void {}

export function handlecharacterAuthorityUpdated(
  event: characterAuthorityUpdatedEvent
): void {}

export function handleEvolve(event: EvolveEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.level = event.params.newLevel.toI32();
  character.save();
}

export function handleMinted(event: MintedEvent): void {
  const user = getOrCreateUser(event.params.owner);
  var character = new Character(event.params.id.toString()) as Character;

  const name = getName(event.params.character.toI32());
  const rarity = getRarity(event.params.rarity);

  character.id = event.params.id.toString();
  character.owner = user.id;
  character.name = name;
  character.rarity = rarity;
  character.level = 1;
  character.level_max = 6;
  character.trainingTime = 0;
  character.trainingEnd = 0;

  character.save();
}

export function handlecharacterOwnerUpdated(
  event: characterOwnerUpdatedEvent
): void {}

export function handleSetNickname(event: SetNicknameEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  character.nickname = event.params.name;
  character.save();
}

export function handlecharacterTransfer(event: characterTransferEvent): void {
  const character = Character.load(event.params.id.toString()) as Character;
  const user = getOrCreateUser(event.params.to);

  character.owner = user.id;
  character.save();
}
