export type INR_BALANCES = {
  [user: string]: {
    balance: number;
    locked: number;
  };
};

export type ORDERBOOK = {
  [asset: string]: Market;
};

type Market = {
  yes?: Side;
  no?: Side;
};

type Side = {
  [price: string]: Order;
};

type Order = {
  total: number;
  orders: Record<string, number>;
};
