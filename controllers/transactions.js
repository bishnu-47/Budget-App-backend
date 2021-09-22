// @desc   get all transactions
// @route   GET /api/v1/transactions
// @access   Public
export const getTransactions = (req, res, next) => {
  res.send("GET all transactions");
};

// @desc   add a transaction
// @route   POST /api/v1/transaction
// @access   Public
export const addTransaction = (req, res, next) => {
  res.send("POST all transaction");
};

// @desc   delete a transaction
// @route   DELETE /api/v1/transaction
// @access   Public
export const deleteTransaction = (req, res, next) => {
  res.send("DELETE all transaction");
};
