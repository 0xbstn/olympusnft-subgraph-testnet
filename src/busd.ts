import {
  Approval as ApprovalEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  Transfer as TransferEvent,
} from "../generated/busd/busd";


import {
  log
 } from "@graphprotocol/graph-ts";

import { CHEST_CONTRACT, getOrCreateUser } from "./utils";

export function handleApproval(event: ApprovalEvent): void {
  log.info('b',[])

  let user = getOrCreateUser(event.params.owner);
  if (event.params.spender.toHex() == CHEST_CONTRACT) {
    user.amountApprovedChest = event.params.amount;
    user.save();
  }
}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {}

export function handleTransfer(event: TransferEvent): void {}
