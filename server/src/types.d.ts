export type INR_BALANCE = {
  [user: string]: {
    balance: number;
    locked: number;
  };
};

export type ORDER = {
  [asset: string]: Market;
};
export type STOCK_BALANCE = {
  [user: string]: Market;
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

export type STOCK_BALANCE = {
  [user: string]: UserAssets;
};

type UserAssets = {
  [asset: string]: AssetSides;
};

type AssetSides = {
  YES?: Stock;
  NO?: Stock;
};

type Stock = {
  quantity: number;
  locked: number;
};
