const Account = require("./account.model");

exports.addAccountType = async (req, res, next) => {
  const { name, type } = req.body;
  try {
    const accountTypeData = await Account.create({ name, type });
    res.status(201).json({
      message: "Account type created",
      data: accountTypeData,
    });
  } catch (err) {
    next(err);
  }
};
