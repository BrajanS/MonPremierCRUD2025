import PurchasesModel from "../models/purchasesModel.js";
import ProductsModel from "../models/productsModel.js";

// #region Classic purchase Routes ----------
const purchases = async (_, response) => {
  try {
    const allPurchases = await PurchasesModel.find({});
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
    const newPurchase = await PurchasesModel.create(userBuys);
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
const userPurchases = async (req, response) => {
  try {
    const idUser = req.params.id;
    const allUserPurchases = await PurchasesModel.find({ userId: idUser });
    const arrayProducts = allUserPurchases.map((prod) => {
      return JSON.stringify(prod.productId).split(`"`)[1];
    });
    const findBoughtProducts = await Promise.all(
      arrayProducts.map(async (productId) => {
        return await ProductsModel.findById(productId);
      })
    );
    if (findBoughtProducts) {
      response.status(200).send(findBoughtProducts);
    }
  } catch (err) {
    console.error(err);
    response.status(500).json(err);
  }
};

const productBuyers = (req, response) => {};
// #endregion -------------------------------

export { purchases, purchase, userPurchases, productBuyers };
