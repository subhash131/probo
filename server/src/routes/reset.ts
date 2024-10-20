import { Router, type Request, type Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } from "../db";
import { clearInrBalances } from "../utils/clear-inr-balances";
import { clearOrders } from "../utils/clear-orders";
import { clearStockBalance } from "../utils/clear-stock-balances";

const router = Router();

//reset: clear memory
router.post("/", (req: Request, res: Response) => {
  clearInrBalances(INR_BALANCES);
  clearOrders(ORDERBOOK);
  clearStockBalance(STOCK_BALANCES);
  res.send({ msg: "reset complete" }).status(200);
});

export default router;
