import { Router, type Request, type Response } from "express";
import { INR_BALANCES, ORDERBOOK } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Mint fresh tokens
router.post("/mint", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity } = req.body;
  const invalidInput = validateInput(userId, stockSymbol, quantity);
  if (invalidInput) {
    res.send({ msg: "Invalid body, please recheck the fields" }).status(404);
    return;
  }
  if (!INR_BALANCES[userId]) {
    res.send({ msg: "user not found!" }).status(404);
    return;
  }
  if (!ORDERBOOK[stockSymbol]) {
    res.send({ msg: "stock not found!" }).status(404);
    return;
  }
  ORDERBOOK[stockSymbol];

  res.send({ msg: "User Created" });
});

export default router;
