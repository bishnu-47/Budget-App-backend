import Transaction from "../models/Transaction.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// @desc   get all transactions
// @route   GET /api/v1/transactions
// @access   Protected
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc   add a transaction
// @route   POST /api/v1/transaction
// @access   Protected
export const addTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc   delete a transaction
// @route   DELETE /api/v1/transaction
// @access   Protected
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return next(new ErrorResponse("transaction not found!", 404));
    }

    await transaction.remove();
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return next(err);
  }
};
