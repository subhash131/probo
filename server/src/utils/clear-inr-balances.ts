import type { INR_BALANCE } from "../types";

export function clearInrBalances(inrBalance: INR_BALANCE): void {
  Object.keys(inrBalance).forEach((user) => {
    delete inrBalance[user];
  });
}
