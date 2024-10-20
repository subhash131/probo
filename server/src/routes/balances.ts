import { Router, type Request, type Response } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db";

const router = Router();

//get INR_BALANCES
router.get("/inr", (req: Request, res: Response) => {
  res.send(INR_BALANCES).status(200);
});

//get STOCK_BALANCES
router.get("/stock", (req: Request, res: Response) => {
  res.send(STOCK_BALANCES).status(200);
});

export default router;
