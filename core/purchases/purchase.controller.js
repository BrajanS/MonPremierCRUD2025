import PurchasesModel from "./repository/purchasesModel.js";
import ProductsModel from "../products/repository/productsModel.js";

/**
 * @module purchasesController
 * : All the Controllers that verify each Purchases routes
 */

/**
 * -> Request from Express
 * @typedef {Object} Req
 * -> Request from Express
 * @typedef {Object} Res
 * -> Promise without Returns to Caller
 * @typedef {Promise<void>} Pvoid
 * -> Ignored ("_" -> Not used) Request from Express
 * @typedef {Object} ignoredReq
 * -> Ignored ("_" -> Not used) Response from Express
 * @typedef {Object} ignoredRes
 */

// #region Classic purchase Routes ----------
/**
 * @param {ignoredReq} - Useless Request from Express, not Used so ignored
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
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

/**
 * @param {Req} - Request from Express by POSTMAN (Rest API)
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
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

/**
 * @param {Req} - Request from Express by POSTMAN (Rest API)
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
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

/**
 * @param {ignoredReq} - Useless Request from Express, not Used so ignored
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
const productBuyers = (_, response) => {
  response
    .status(500)
    .send("This route wasn't finished ..., and Will NEVER be.");
};
// #endregion -------------------------------

export { purchases, purchase, userPurchases, productBuyers };
