import { Router, type Request, type Response } from "express";
import { INR_BALANCES } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Onramp INR
router.post("/inr", (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const invalidInput = validateInput(userId, amount);

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

  const updatedBalance = {
    ...INR_BALANCES[userId],
    balance: INR_BALANCES[userId].balance + Number(amount),
  };
  INR_BALANCES[userId] = updatedBalance;
  res.send({ message: `Onramped ${userId} with amount ${amount}` }).status(200);
});

export default router;
