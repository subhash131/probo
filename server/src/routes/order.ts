import { Router, type Request, type Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } from "../db";
import { validateInput } from "../utils/validate-input";
import type { STOCK_BALANCE } from "../types";

const router = Router();

//Buy the yes and no stock
router.post("/buy", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price, stockType } = req.body;
  const invalidInput = validateInput(
    userId,
    stockSymbol,
    quantity,
    price,
    stockType
  );
  if (invalidInput) {
    res.send({ msg: "Invalid body, please recheck the fields" }).status(404);
    return;
  }

  if (!INR_BALANCES[userId]) {
    res.send({ msg: "user not found!" }).status(404);
    return;
  }

  if (!STOCK_BALANCES[stockSymbol]) {
    res.send({ msg: "Stock symbol not found!" }).status(404);
    return;
  }
  if (!STOCK_BALANCES[stockSymbol]) {
    res.send({ msg: "Stock not found!" }).status(404);
    return;
  }
  if (
    INR_BALANCES[userId].balance - INR_BALANCES[userId].locked <
    Number(quantity) * Number(price)
  ) {
    res.send({ msg: "Insufficient Balance!" }).status(400);
    return;
  }

  const availableStocks = Object.keys(STOCK_BALANCES).reduce((prev, user) => {
    if (
      STOCK_BALANCES[user][stockSymbol] &&
      STOCK_BALANCES[user][stockSymbol][stockType]
    ) {
      const { quantity, locked } = STOCK_BALANCES[user][stockSymbol][stockType];
      const available = quantity - locked;
      return prev + available;
    }
    return prev;
  }, 0);

  if (availableStocks === 0) {
    //update orderbook
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
  }
  res.send({ ORDERBOOK }).status(200);
});

//Place Sell Order for yes and no
router.post("/sell", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price, stockType } = req.body;
  const invalidInput = validateInput(
    userId,
    stockSymbol,
    quantity,
    price,
    stockType
  );
  if (invalidInput) {
    res.send({ msg: "Invalid body, please recheck the fields" }).status(404);
    return;
  }
  res.send({ msg: "User Created" });
});

export default router;
