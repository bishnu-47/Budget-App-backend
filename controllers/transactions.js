import Transaction from "../models/Transaction.js";

// @desc   get all transactions
// @route   GET /api/v1/transactions
// @access   Public
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error!",
    });
  }
};

// @desc   add a transaction
// @route   POST /api/v1/transaction
// @access   Public
export const addTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err._message === "Transaction validation failed") {
      const messages = Object.values(err.errors).map((val) => {
        return val.properties.message;
      });

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error!",
      });
    }
  }
};

// @desc   delete a transaction
// @route   DELETE /api/v1/transaction
// @access   Public
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "transaction not found!",
      });
    }

    await transaction.remove();
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error!",
    });
  }
};
