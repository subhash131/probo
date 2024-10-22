import { STOCK_BALANCES } from "../db";

export type Market = {
  [name: string]: {
    [stockType: string]: number;
  };
};
export function fetchStockBalance() {
  const market: Market = {};
  for (const user of Object.keys(STOCK_BALANCES)) {
    const symbol = STOCK_BALANCES[user];
    for (const sym of Object.keys(symbol)) {
      const stock = symbol[sym];
      Object.keys(stock).forEach((current) => {
        const availableStocks = Math.abs(
          stock[current].quantity - stock[current].locked
        );
        if (!market[sym]) {
          market[sym] = { [current]: availableStocks };
        } else {
          if (market[sym][current]) {
            market[sym] = {
              ...market[sym],
              [current]: availableStocks + market[sym][current],
            };
          } else {
            market[sym] = {
              ...market[sym],
              [current]: availableStocks,
            };
          }
        }
      });
    }
  }
  return market;
}
