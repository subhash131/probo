import { Router, type Request, type Response } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db";

const router = Router();

//Get INR balance of a user
router.get("/inr/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!INR_BALANCES[userId]) {
    res.send({ msg: "User not found!" }).status(404);
    return;
  }
  res.send(INR_BALANCES[userId]).status(200);
});

//Get Stock Balance
router.get("/stock/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!STOCK_BALANCES[userId]) {
    res.send({ msg: "User not found" }).status(404);
    return;
  }
  res.send(STOCK_BALANCES[userId]).status(200);
});

export default router;
