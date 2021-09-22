import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "please enter an amount with positive or negitive sign"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
