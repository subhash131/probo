import { Router, type Request, type Response } from "express";
import { INR_BALANCES, ORDERBOOK } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Mint fresh tokens
router.post("/mint", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price } = req.body;
  const invalidInput = validateInput(userId, stockSymbol, quantity);
  if (invalidInput) {
    res
      .send({ message: "Invalid body, please recheck the fields" })
      .status(404);
    return;
  }
  if (!INR_BALANCES[userId]) {
    res.send({ message: "user not found!" }).status(404);
    return;
  }
  if (!ORDERBOOK[stockSymbol]) {
    res.send({ message: "stock not found!" }).status(404);
    return;
  }
  ORDERBOOK[stockSymbol];

  res
    .send({
      message: `Minted ${25} 'yes' and 'no' tokens for user ${userId}, remaining balance is 0`,
    })
    .status(200);
});

export default router;
