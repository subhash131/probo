import type { ORDERBOOK } from "../types";

export function clearOrders(order: ORDERBOOK): void {
  Object.keys(order).forEach((asset) => {
    const markets = order[asset];

    // Clear each stock(yes/no) for the asset
    Object.keys(markets).forEach((stock) => {
      const sideEntries = markets[stock];

      // Check if sideEntries exist and clear its properties
      if (sideEntries) {
        Object.keys(sideEntries).forEach((price) => {
          delete sideEntries[price]; // Delete each price entry
        });
      }

      // Optionally delete the side itself if required
      delete markets[stock];
    });
    delete order[asset];
  });
}
