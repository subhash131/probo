import express from "express";
import { Server, type Socket } from "socket.io";
import cors from "cors";
import { createServer } from "http";

import userRoutes from "./routes/user";
import balanceRoutes from "./routes/balance";
import balancesRoutes from "./routes/balances";
import symbolRoutes from "./routes/symbol";
import orderbookRoutes from "./routes/orderbook";
import resetRoutes from "./routes/reset";
import onrampRoutes from "./routes/onramp";
import orderRoutes from "./routes/order";
import tradeRoutes from "./routes/trade";
import { INR_BALANCES, STOCK_BALANCES } from "./db";
import { getTradingData } from "./utils/get-trading-data";

const app = express();
const port = 8000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//server
server.listen(port, () => {
  console.log(`Probo listening on port ${port}`);
});

//parse JSON bodies
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/balance", balanceRoutes);
app.use("/balances", balancesRoutes);
app.use("/symbol", symbolRoutes);
app.use("/orderbook", orderbookRoutes);
app.use("/reset", resetRoutes);
app.use("/onramp", onrampRoutes);
app.use("/order", orderRoutes);
app.use("/trade", tradeRoutes);

export type Market = {
  [name: string]: {
    [stockType: string]: number;
  };
};
const market: Market = {};

// websocket
io.on("connection", (socket: Socket) => {
  console.log("a user connected::", socket.id);

  socket.on("fetch-balance", (userId) => {
    if (INR_BALANCES[userId]) {
      socket.emit("balance-response", INR_BALANCES[userId]);
    } else {
      socket.emit("balance-response", { msg: "User not found" });
    }
  });

  socket.on("fetch-market", () => {
    for (const user of Object.keys(STOCK_BALANCES)) {
      const symbol = STOCK_BALANCES[user];
      for (const sym of Object.keys(symbol)) {
        const stock = symbol[sym];
        Object.keys(stock).forEach((current) => {
          if (!market[sym]) {
            market[sym] = { [current]: stock[current].quantity };
          } else {
            if (market[sym][current]) {
              market[sym] = {
                ...market[sym],
                [current]: stock[current].quantity + market[sym][current],
              };
            } else {
              market[sym] = {
                ...market[sym],
                [current]: stock[current].quantity,
              };
            }
          }
        });
      }
    }
    socket.emit("market-response", market);
  });

  socket.on("subscribe", (symbol) => {
    console.log(`${socket.id} :: subscribed room :: ${symbol}`);
    socket.join(symbol);
    if (!market[symbol]) return;

    const marketData = getTradingData(market[symbol], symbol);
    io.to(symbol).emit("stock-data", marketData);
  });

  socket.on("unsubscribe", (symbol) => {
    console.log(`${socket.id} :: unsubscribed room :: ${symbol}`);
    socket.leave(symbol);
  });

  socket.on("trade", (symbol) => {
    const marketData = getTradingData(market[symbol], symbol);
    io.to(symbol).emit("stock-data", marketData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});
