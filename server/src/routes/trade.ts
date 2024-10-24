import { Router, type Request, type Response } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Mint fresh tokens
router.post("/mint", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price } = req.body;
  const invalidInput = validateInput(userId, stockSymbol, quantity);
  if (invalidInput) {
    res
      .status(404)
      .send({ message: "Invalid body, please recheck the fields" });
    return;
  }
  if (!INR_BALANCES[userId]) {
    res.status(404).send({ message: "user not found!" });
    return;
  }
  // if (!STOCK_BALANCES[stockSymbol]) {
  //   res.status(404).send({ message: "stock not found!" });
  //   return;
  // }

  const cost = Number(price) * Number(quantity) * 2;

  if (cost > INR_BALANCES[userId].balance - INR_BALANCES[userId].locked) {
    res.status(400).send({ message: "Insufficient balance!" });
    return;
  }
  INR_BALANCES[userId].balance = INR_BALANCES[userId].balance - cost;
  const yes = { quantity: Number(quantity), locked: 0 };
  const no = { quantity: Number(quantity), locked: 0 };
  STOCK_BALANCES[userId] = { [stockSymbol]: { yes, no } };

  res.status(200).send({
    message: `Minted ${quantity} 'yes' and 'no' tokens for user ${userId}, remaining balance is ${INR_BALANCES[userId].balance}`,
  });
});

export default router;
