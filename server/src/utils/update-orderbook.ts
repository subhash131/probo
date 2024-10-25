import { INR_BALANCES, ORDERBOOK } from "../db";

export const updateOrderbook = ({
  stockSymbol,
  stockType,
  price,
  userId,
  quantity,
}: {
  stockSymbol: string;
  stockType: string;
  userId: string;
  price: number;
  quantity: number;
}) => {
  if (
    ORDERBOOK[stockSymbol] &&
    ORDERBOOK[stockSymbol][stockType] &&
    ORDERBOOK[stockSymbol][stockType][price]
  ) {
    ORDERBOOK[stockSymbol][stockType][price].total += quantity;
    if (ORDERBOOK[stockSymbol][stockType][price].orders[userId]) {
      ORDERBOOK[stockSymbol][stockType][price].orders[userId] += quantity;
    } else {
      ORDERBOOK[stockSymbol][stockType][price].orders = {
        ...ORDERBOOK[stockSymbol][stockType][price].orders,
        [userId]: quantity,
      };
    }
    INR_BALANCES[userId].locked = quantity * price;
  } else if (ORDERBOOK[stockSymbol] && ORDERBOOK[stockSymbol][stockType]) {
    const orders = {
      [userId]: quantity,
    };
    const purchased = {
      [price]: {
        total: quantity,
        orders,
      },
    };
    ORDERBOOK[stockSymbol][stockType] = {
      ...ORDERBOOK[stockSymbol][stockType],
      ...purchased,
    };
  } else {
    const orders = {
      [userId]: quantity,
    };
    const purchased = {
      [price]: {
        total: quantity,
        orders,
      },
    };
    const stock = {
      [stockType]: purchased,
    };
    ORDERBOOK[stockSymbol] = { ...ORDERBOOK[stockSymbol], ...stock };
  }
};
