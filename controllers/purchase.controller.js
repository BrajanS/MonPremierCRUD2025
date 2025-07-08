import purchasesData from "../data/purchases.js";

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

const purchase = (req, response) => {};

export { purchases, purchase };
