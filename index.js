import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import TransactionsRoute from "./routes/transactions.js";

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

app.use("/api/v1/transactions", TransactionsRoute);

app.get("/", (req, res) => {
  res.send("Hi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server started on port: ${PORT}`.yellow.bold)
);
