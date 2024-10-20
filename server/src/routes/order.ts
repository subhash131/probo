import { Router, type Request, type Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } from "../db";
import { validateInput } from "../utils/validate-input";

const router = Router();

//Buy the yes and no stock
router.post("/buy", (req: Request, res: Response) => {
  const {
    userId,
    stockSymbol,
    quantity: strQuantity,
    price: strPrice,
    stockType,
  } = req.body;
  const invalidInput = validateInput(
    userId,
    stockSymbol,
    strQuantity,
    strPrice,
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

  const myPurchases = {
    bought: 0,
    isStockValid: false,
  };

  Object.keys(STOCK_BALANCES).forEach((user) => {
    if (STOCK_BALANCES[user] && STOCK_BALANCES[user][stockSymbol]) {
      myPurchases.isStockValid = true;
    }
  });
  if (!myPurchases.isStockValid) {
    res.send({ msg: "Stock symbol not found!" }).status(404);
    return;
  }

  const quantity = Number(strQuantity);
  const price = Number(strPrice);

  if (
    INR_BALANCES[userId].balance - INR_BALANCES[userId].locked <
    quantity * price
  ) {
    res.send({ msg: "Insufficient Balance!" }).status(400);
    return;
  }

  const updateBuyerQuantity = ({
    quantity,
    locked,
  }: {
    quantity: number;
    locked: number;
  }) => {
    if (
      STOCK_BALANCES[userId] &&
      STOCK_BALANCES[userId][stockSymbol] &&
      STOCK_BALANCES[userId][stockSymbol][stockType]
    ) {
      STOCK_BALANCES[userId][stockSymbol][stockType].quantity += quantity;
    } else {
      const stkType = { quantity, locked };
      const stkSymbol = { [stockType]: stkType };
      STOCK_BALANCES[userId] = { [stockSymbol]: stkSymbol };
    }
  };

  //exchange stocks
  for (const user of Object.keys(STOCK_BALANCES)) {
    if (myPurchases.bought >= quantity) {
      break;
    }
    if (
      STOCK_BALANCES[user][stockSymbol] &&
      STOCK_BALANCES[user][stockSymbol][stockType]
    ) {
      const { quantity: totalQuantity, locked } =
        STOCK_BALANCES[user][stockSymbol][stockType];

      const sellingQuantity = totalQuantity - locked;
      const buyingQuantity = quantity - myPurchases.bought;

      if (sellingQuantity >= buyingQuantity) {
        myPurchases.bought += buyingQuantity;
        //update stock balances
        STOCK_BALANCES[user][stockSymbol][stockType].quantity -= buyingQuantity;
        updateBuyerQuantity({
          locked: buyingQuantity,
          quantity: buyingQuantity,
        });

        //update INR balances
        INR_BALANCES[user].balance += buyingQuantity * price;
        INR_BALANCES[userId].balance -= buyingQuantity * price;
      } else if (sellingQuantity < buyingQuantity && sellingQuantity != 0) {
        myPurchases.bought += sellingQuantity;
        //update stock balances
        STOCK_BALANCES[user][stockSymbol][stockType].quantity -=
          sellingQuantity;
        updateBuyerQuantity({
          locked: sellingQuantity,
          quantity: sellingQuantity,
        });
        //update INR balances
        INR_BALANCES[user].balance += sellingQuantity * price;
        INR_BALANCES[userId].balance -= sellingQuantity * price;
      }
    }
  }

  //update orderbook
  if (
    ORDERBOOK[stockSymbol] &&
    ORDERBOOK[stockSymbol][stockType] &&
    ORDERBOOK[stockSymbol][stockType][price]
  ) {
    ORDERBOOK[stockSymbol][stockType][price].total += quantity;
    if (ORDERBOOK[stockSymbol][stockType][price].orders[userId]) {
      ORDERBOOK[stockSymbol][stockType][price].orders[userId] += quantity;
    } else {
      ORDERBOOK[stockSymbol][stockType][price].orders = {
        ...ORDERBOOK[stockSymbol][stockType][price].orders,
        [userId]: quantity,
      };
    }
    INR_BALANCES[userId].locked = quantity * price;
  } else if (ORDERBOOK[stockSymbol] && ORDERBOOK[stockSymbol][stockType]) {
    const orders = {
      [userId]: quantity,
    };
    const purchased = {
      [price]: {
        total: quantity,
        orders,
      },
    };
    ORDERBOOK[stockSymbol][stockType] = {
      ...ORDERBOOK[stockSymbol][stockType],
      ...purchased,
    };
  } else {
    const orders = {
      [userId]: quantity,
    };
    const purchased = {
      [price]: {
        total: quantity,
        orders,
      },
    };
    const stock = {
      [stockType]: purchased,
    };
    ORDERBOOK[stockSymbol] = { ...ORDERBOOK[stockSymbol], ...stock };
  }

  res.send({ STOCK_BALANCES }).status(200);
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
  if (!INR_BALANCES[userId]) {
    res.send({ msg: "username not found!" }).status(404);
    return;
  }
  if (
    !STOCK_BALANCES[userId] &&
    !STOCK_BALANCES[userId][stockSymbol] &&
    !STOCK_BALANCES[userId][stockSymbol][stockType]
  ) {
    res.send({ msg: "You don't own this stock" }).status(400);
    return;
  }
  if (
    STOCK_BALANCES[userId][stockSymbol][stockType].quantity < Number(quantity)
  ) {
    res.send({ msg: "You don't own have enough stocks to sell" }).status(400);
    return;
  }
  STOCK_BALANCES[userId][stockSymbol][stockType].locked -= quantity;
  res.send({ STOCK_BALANCES }).status(200);
});

export default router;
