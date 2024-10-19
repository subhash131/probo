import express, { type Request, type Response } from "express";
import { Server, type Socket } from "socket.io";
import { createServer } from "http";

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
