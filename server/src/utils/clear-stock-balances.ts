import type { Market, STOCK_BALANCE } from "../types";

export function clearStockBalance(stockBalance: STOCK_BALANCE): void {
  Object.keys(stockBalance).forEach((user) => {
    const symbol = stockBalance[user];

    // Clear each stock for the user
    Object.keys(symbol).forEach((stock) => {
      const stockEntries = symbol[stock as keyof Market];
      if (stockEntries) {
        // Clear all entries under the stock
        Object.keys(stockEntries).forEach((price) => {
          delete stockEntries[price];
        });
      }
      // Delete the stock itself
      delete symbol[stock as keyof Market];
    });

    // Finally, delete the user from stockBalance
    delete stockBalance[user];
  });
}
