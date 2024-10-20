import express from "express";
import { Server, type Socket } from "socket.io";
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

const app = express();
const port = 8000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//to read body
app.use(express.json());
app.use("/user", userRoutes);
app.use("/balance", balanceRoutes);
app.use("/balances", balancesRoutes);
app.use("/symbol", symbolRoutes);
app.use("/orderbook", orderbookRoutes);
app.use("/reset", resetRoutes);
app.use("/onramp", onrampRoutes);
app.use("/order", orderRoutes);
app.use("/trade", tradeRoutes);

server.listen(port, () => {
  console.log(`Probo listening on port ${port}`);
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected::", socket.id);

  socket.on("fetch-balance", (userId) => {
    socket.emit("balance-response", INR_BALANCES[userId]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});
