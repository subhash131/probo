import { Router, type Request, type Response } from "express";
import { ORDERBOOK } from "../db";

const router = Router();

//create a new symbol in STOCK_BALANCES with default yes and no entries
router.post("/create/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  if (ORDERBOOK[stockSymbol]) {
    res.status(400).send({ error: "Stock symbol already exist!" });
  } else {
    ORDERBOOK[stockSymbol] = {
      no: {},
      yes: {},
    };
    res.send({ msg: "Stock symbol created created!" }).status(201);
  }
});

//initialize stock (custom)
router.post("/init/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  const { yesPrice, yesOrders, noPrice, noOrders } = req.body;
  if (!ORDERBOOK[stockSymbol]) {
    res.status(404).send({ error: "Stock symbol not found!" });
  } else {
    ORDERBOOK[stockSymbol] = {
      no: {
        [noPrice]: {
          orders: {
            init: noOrders,
          },
          total: noOrders,
        },
      },
      yes: {
        [yesPrice]: {
          orders: {
            init: yesOrders,
          },
          total: yesOrders,
        },
      },
    };
    res.send({ msg: "Stock symbol created created!" }).status(201);
  }
});

export default router;
