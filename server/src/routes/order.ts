import { Router, type Request, type Response } from "express";
import { INR_BALANCES } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Buy the yes and no stock
router.post("/buy", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price, stockType } = req.body;
  const invalidInput = validateInput(
    userId,
    stockSymbol,
    quantity,
    price,
    stockType
  );
  if (invalidInput) {
    res.send({ msg: "Invalid body, please recheck the fields" }).status(404);
    return;
  }
  if (!INR_BALANCES[userId]) {
    res.send({ msg: "user not found!" }).status(404);
    return;
  }
  if (
    INR_BALANCES[userId].balance - INR_BALANCES[userId].locked <
    Number(quantity) * Number(price)
  ) {
    res.send({ msg: "Insufficient Balance!" }).status(400);
  }
});

//Place Sell Order for yes and no
router.post("/sell", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price, stockType } = req.body;
  const invalidInput = validateInput(
    userId,
    stockSymbol,
    quantity,
    price,
    stockType
  );
  if (invalidInput) {
    res.send({ msg: "Invalid body, please recheck the fields" }).status(404);
    return;
  }
  res.send({ msg: "User Created" });
});

export default router;
