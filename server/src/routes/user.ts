import { Router, type Request, type Response } from "express";
import { INR_BALANCES } from "../db";

const router = Router();

//add user to INR_BALANCES with unique user id and default balance is 0
router.post("/create/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  if (INR_BALANCES[userId]) {
    res.status(400).send({ message: "user already exist!" });
  } else {
    INR_BALANCES[userId] = { balance: 0, locked: 0 };
    res.status(201).send({ message: `User ${userId} created` });
  }
});

export default router;
