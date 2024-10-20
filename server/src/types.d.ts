export type INR_BALANCE = {
  [user: string]: {
    balance: number;
    locked: number;
  };
};

export type ORDERBOOK = {
  [symbol: string]: {
    [stock: string]: {
      [price: string]: {
        total: number;
        orders: {
          [user: string]: number;
        };
      };
    };
  };
};

export type stockType = {
  []
};

type STOCK_BALANCE = {
  [user: string]: {
    [symbol: string]: {
      [stock: string]: {
        quantity: number;
        locked: number;
      };
    };
  };
};
