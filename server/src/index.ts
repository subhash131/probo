import express, { type Request, type Response } from "express";
import { Server, type Socket } from "socket.io";
import { createServer } from "http";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } from "./db";
import { clearInrBalances } from "./utils/clear-inr-balances";
import { clearOrders } from "./utils/clear-orders";
import { clearStockBalance } from "./utils/clear-stock-balances";

const app = express();
const port = 8000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected::", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Probo listening on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send({ msg: "Hello" });
});

//add user to INR_BALANCES with unique user id and default balance is 0
app.post("/user/create/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  if (INR_BALANCES[userId]) {
    res.status(400).send({ error: "user already exist!" });
  } else {
    INR_BALANCES[userId] = { balance: 0, locked: 0 };
    res.send({ msg: "user created!" }).status(201);
  }
});

//create a new symbol in STOCK_BALANCES with default yes and no entries
app.post("/symbol/create/:stockSymbol", (req: Request, res: Response) => {
  const { stockSymbol } = req.params;
  if (STOCK_BALANCES[stockSymbol]) {
    res.status(400).send({ error: "Stock symbol already exist!" });
  } else {
    STOCK_BALANCES[stockSymbol] = {
      no: {},
      yes: {},
    };
    res.send({ msg: "Stock symbol created created!" }).status(201);
  }
});

//get ORDERBOOK
app.get("/orderbook", (req: Request, res: Response) => {
  res.send(ORDERBOOK).status(200);
});

//get INR_BALANCES
app.get("/balances/inr", (req: Request, res: Response) => {
  res.send(INR_BALANCES).status(200);
});

//get STOCK_BALANCES
app.get("/balances/stock", (req: Request, res: Response) => {
  res.send(STOCK_BALANCES).status(200);
});

//reset: clear memory
app.post("/reset", (req: Request, res: Response) => {
  clearInrBalances(INR_BALANCES);
  clearOrders(ORDERBOOK);
  clearStockBalance(STOCK_BALANCES);
  res.send({ msg: "reset complete" }).status(200);
});

//Get INR balance of a user
app.get("/balance/inr/:userId", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//Onramp INR
/**
 * {
   "userId": "user1",
   "amount": 10000 // make sure amount is in paise and not rs
}
 */
app.post("/onramp/inr", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//Get Stock Balance
app.get("/balance/stock/:userId", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//Buy the yes and no stock
/**
 * {
  "userId": "123",
  "stockSymbol": "BTC_USDT_10_Oct_2024_9_30",
  "quantity": 100,
  "price": 1000,
  "stockType": "yes",
}
 */
app.post("/order/buy", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//Place Sell Order for yes and no
/**
{
  "userId": "123",
  "stockSymbol": "ABC",
  "quantity": 100,
  "price": 1100,
  "stockType": "yes",
}
 */
app.post("/order/sell", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//View Orderbook
app.get("/orderbook/:stockSymbol", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});

//Mint fresh tokens
/**
 * {
  "userId": "123",
  "stockSymbol": "ABC",
  "quantity": 100,
}
 */
app.post("/trade/mint", (req: Request, res: Response) => {
  res.send({ msg: "User Created" });
});
