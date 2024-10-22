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
import { INR_BALANCES } from "./db";
import { getTradingData } from "./utils/get-trading-data";
import { fetchMarket } from "./utils/fetch-market";

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

// websocket
io.on("connection", (socket: Socket) => {
  console.log("a user connected::", socket.id);

  socket.on("fetch-balance", (userId) => {
    if (INR_BALANCES[userId]) {
      socket.emit("balance-response", INR_BALANCES[userId]);
    } else {
      socket.emit("balance-response", { message: "User not found" });
    }
  });

  socket.on("fetch-market", () => {
    const market = fetchMarket();
    console.log("fetch-market ::", market);
    socket.emit("market-response", market);
  });

  socket.on("subscribe", (symbol) => {
    console.log(`${socket.id} :: subscribed room :: ${symbol}`);
    socket.join(symbol);
    const market = fetchMarket();
    console.log("🚀 ~ subscribe ~ market:", market);
    if (!market[symbol]) return;
    const marketData = getTradingData(market[symbol], symbol);
    io.to(symbol).emit("stock-data", marketData);
  });

  socket.on("unsubscribe", (symbol) => {
    console.log(`${socket.id} :: unsubscribed room :: ${symbol}`);
    socket.leave(symbol);
  });

  socket.on("trade", (symbol) => {
    const market = fetchMarket();
    if (!market) return;
    const marketData = getTradingData(market[symbol], symbol);
    io.to(symbol).emit("stock-data", marketData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

export default server;
