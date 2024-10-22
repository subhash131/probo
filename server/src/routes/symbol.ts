import { Router, type Request, type Response } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db";

const router = Router();

//create a new symbol in STOCK_BALANCES with default yes and no entries
router.post("/create/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  if (STOCK_BALANCES[stockSymbol]) {
    res.status(400).send({ message: "Stock symbol already exist!" });
  } else {
    const stock = { quantity: 100, locked: 50 };
    const market = { yes: { ...stock }, no: { ...stock } };

    if (!STOCK_BALANCES["user1"]) {
      STOCK_BALANCES["user1"] = { [stockSymbol]: structuredClone(market) };
    } else {
      STOCK_BALANCES["user1"] = {
        ...STOCK_BALANCES["user1"],
        [stockSymbol]: structuredClone(market),
      };
    }
    if (!STOCK_BALANCES["user2"]) {
      STOCK_BALANCES["user2"] = { [stockSymbol]: structuredClone(market) };
    } else {
      STOCK_BALANCES["user2"] = {
        ...STOCK_BALANCES["user2"],
        [stockSymbol]: structuredClone(market),
      };
    }

    INR_BALANCES["user1"] = { balance: 100, locked: 0 };
    INR_BALANCES["user2"] = { balance: 100, locked: 0 };

    res.send({ message: `Symbol ${stockSymbol} created` }).status(201);
  }
});

export default router;
