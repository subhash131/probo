import { Router, type Request, type Response } from "express";
import { ORDERBOOK } from "../db";

const router = Router();

//get ORDERBOOK
router.get("/", (req: Request, res: Response) => {
  res.status(200).send(ORDERBOOK);
});

//View Orderbook
router.get("/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  if (!ORDERBOOK[stockSymbol]) {
    res.send({ message: "Stock symbol not found!" }).status(404);
    return;
  }
  res.send(ORDERBOOK[stockSymbol]).status(200);
});

export default router;
