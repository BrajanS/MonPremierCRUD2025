// #region IMPORTS
import express from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../core/products/product.controller.js";
import {
  productBuyers,
  purchase,
  purchases,
  userPurchases,
} from "../core/purchases/purchase.controller.js";
import { logger, readJson } from "../middleware/middlewareTest.js";
// #endregion IMPORTS

/**
 * @module routes
 * : This place Handles all Routes for all Controllers
 */
function routes(userController) {
  const router = express.Router();

  router.get("/", (req, res) => userController.root(req, res));

  // #region USER ROUTES -------------------
  router.get("/users", logger, (req, res) => userController.getUsers(req, res));
  router.get("/users/:id", (req, res) => userController.getUser(req, res));

  // prettier-ignore
  router.post("/users", readJson, (req, res) => userController.postUser(req, res));
  router.put("/users/:id", (req, res) => userController.putUser(req, res));
  // prettier-ignore
  router.delete("/users/:id", (req, res) => userController.deleteUser(req, res)
  );

  // USER FILTERS ROUTES

  router.get("/youngest", (req, res) => userController.youngestUser(req, res));
  router.get("/search", (req, res) => userController.searchByName(req, res));
  router.get("/average-age", (req, res) => userController.averageAge(req, res));
  router.get("/domain/:domain", (req, res) => userController.domain(req, res));

  router.post("/sort", (req, res) => userController.sort(req, res));

  // #endregion USER ROUTES ----------------

  // #region PRODUCT ROUTES ----------------
  router.get("/products", getProducts);
  router.get("/products/:id", getProduct);

  router.post("/products", postProduct);
  router.put("/products/:id", putProduct);
  router.delete("/products/:id", deleteProduct);
  // #endregion PRODUCT ROUTES -------------

  // #region PURCHASES ROUTES --------------
  router.get("/purchases", purchases);
  router.post("/purchase", purchase);

  router.get("/users/:id/purchases", userPurchases);
  router.get("/products/:id/buyers", productBuyers);
  // #endregion PURCHASES ROUTES -----------

  // Express 5 doc changed from "/*" to -> "/*Any-Name" for Page not found, else it thinks "*" is a PARAMS
  router.get("/*notfound", (req, res) => userController.notFound(req, res));
  return router;
}

export default routes;
