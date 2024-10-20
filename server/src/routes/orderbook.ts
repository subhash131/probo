import { Router, type Request, type Response } from "express";
import { ORDERBOOK, STOCK_BALANCES } from "../db";

const router = Router();

//get ORDERBOOK
router.get("/", (req: Request, res: Response) => {
  res.send(ORDERBOOK).status(200);
});

//View Orderbook
router.get("/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  if (!STOCK_BALANCES[stockSymbol]) {
    res.send({ msg: "Stock symbol not found!" }).status(404);
    return;
  }
  res.send(STOCK_BALANCES[stockSymbol]).status(200);
});

export default router;
