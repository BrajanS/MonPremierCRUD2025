import purchasesData from "../data/purchases.js";

// #region Classic purchase Routes ----------
const purchases = (_, response) => {
  try {
    const allPurchases = purchasesData;
    if (allPurchases !== undefined) {
      response.status(200).send(allPurchases);
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const purchase = (req, response) => {
  try {
    const userBuys = req.body;
    console.info(purchasesData);
    const currentDate = new Date().toISOString();
    Object.assign(userBuys, { date: currentDate });
    purchasesData.push(userBuys);
    response.status(200).json(userBuys);
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};
// #endregion Classic purchase Routes -------

// #region Find specific Target from Purchase
const userPurchases = (req, response) => {};

const productBuyers = (req, response) => {};
// #endregion -------------------------------

export { purchases, purchase, userPurchases, productBuyers };
