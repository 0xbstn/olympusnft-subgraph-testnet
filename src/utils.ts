import {
  BigInt,
  Bytes,
} from "@graphprotocol/graph-ts";
import { User, Chest } from "../generated/schema";


class CostLevelUp {
  id: number;
  cost: number;
}

class Name {
  name: string;
  id: number;
}
class RarityCharacter {
  name: string;
  level_max: number;
  id: number;
}

export const FURNACE_CONTRACT = "0xecdb0f59392ef62b0828978c48cdf40971ac7ad6";
export const CHEST_CONTRACT = "0x4874a452c19ee75daadf0e740de8643821cb3d7d"; 

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const COST_LEVELUP: CostLevelUp[] = [
  { id: 0, cost: 4 },
  { id: 1, cost: 8 },
  { id: 2, cost: 16 },
  { id: 3, cost: 24 },
  { id: 4, cost: 30 },
];

const CHARACTER_NAMES: Name[] = [
  { name: "Medusa", id: 0 },
  { name: "Apollo", id: 1 },
  { name: "Achilles", id: 2 },
  { name: "Titan", id: 3 },
  { name: "Chimera", id: 4 },
  { name: "Zeus", id: 5 },
];
const CHARACTER_RARITIES: RarityCharacter[] = [
  { name: "Normal", level_max: 4, id: 0 },
  { name: "Gold", level_max: 5, id: 1 },
  { name: "Diamond", level_max: 6, id: 2 },
];

const CHEST_RARITIES = ["Common", "Uncommon", "Rare", "Legendary"];

export function getOrCreateUser(address: Bytes): User {
  let user = User.load(address.toHex());
  if (user == null) {
    user = new User(address.toHex());
    user.id = address.toHex();
    user.aOlympBalance = BigInt.fromString("0");
    user.bOlympBalance = BigInt.fromString("0");
    user.stonesBalance = 0;
    user.powderBalance = BigInt.fromString("0");
    user.pendingStonesCount = 0;
    user.amountApprovedFurnace = BigInt.fromString("0");
    user.amountApprovedChest = BigInt.fromString("0");

    user.save();
    initializeChest(address);
  }
  return user as User;
}

function initializeChest(address: Bytes): void {
  for (let i = 0; i < 4; i++) {
    let chest = new Chest(address.toHex() + "-" + i.toString());
    chest.id = address.toHex() + "-" + i.toString();
    chest.owner = address.toHex();
    chest.rarity = CHEST_RARITIES[i];
    chest.amount = 0;
    chest.save();
  }
}

export function getChest(id: string): Chest {
  let chest = Chest.load(id);
  if (chest == null) {
    throw new Error("Chest not found");
  }
  return chest as Chest;
}


export function getRarity(id: number): string {
  for (let i = 0; i < CHARACTER_RARITIES.length; i++) {
    if (CHARACTER_RARITIES[i].id == id) {
      return CHARACTER_RARITIES[i].name;
    }
  }
  throw new Error("Rarity not found");
}

export function getName(id: number): string {
  for (let i = 0; i < CHARACTER_NAMES.length; i++) {
    if (CHARACTER_NAMES[i].id == id) {
      return CHARACTER_NAMES[i].name;
    }
  }
  throw new Error("Name not found");
}

export function getCostLevelUp(id: number): number {
  for (let i = 0; i < COST_LEVELUP.length; i++) {
    if (COST_LEVELUP[i].id == id) {
      return COST_LEVELUP[i].cost;
    }
  }
  throw new Error("Cost not found");
}
