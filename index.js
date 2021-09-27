import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";
import TransactionsRoute from "./routes/transactions.js";
import AuthRoute from "./routes/auth.js";

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

// middlewares
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// router routes middlewares
app.use("/api/v1/transactions", TransactionsRoute);
app.use("/api/auth", AuthRoute);
// error handler (should be last piece of middleware)
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server started on port: ${PORT}`.yellow.bold)
);
