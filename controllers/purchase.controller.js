import PurchaseModel from "../models/purchasesModel.js";

// #region Classic purchase Routes ----------
const purchases = async (_, response) => {
  try {
    const allPurchases = await PurchaseModel.find({});
    if (allPurchases) {
      response.status(200).json(allPurchases);
    } else {
      response
        .status(404)
        .send("Something went wrong while finding the Purchases");
    }
  } catch (err) {
    console.error(err);
    response.status(500).json(err);
  }
};

const purchase = async (req, response) => {
  try {
    const userBuys = req.body;
    const newPurchase = await PurchaseModel.create(userBuys);
    if (newPurchase) {
      response.status(200).json(newPurchase);
    } else {
      response.status(400).send("ERROR 400: Something went wrong");
    }
  } catch (err) {
    console.error(err);
    response.status(500).json(err);
  }
};
// #endregion Classic purchase Routes -------

// #region Find specific Target from Purchase
const userPurchases = (req, response) => {};

const productBuyers = (req, response) => {};
// #endregion -------------------------------

export { purchases, purchase, userPurchases, productBuyers };
