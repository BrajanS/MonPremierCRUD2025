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
  router.get("/users", logger, (req, res, next) =>
    userController.getUsers(req, res, next)
  );
  router.get("/users/:id", (req, res, next) =>
    userController.getUser(req, res, next)
  );

  // prettier-ignore
  router.post("/users", readJson, (req, res, next) => userController.postUser(req, res, next));
  router.put("/users/:id", (req, res, next) =>
    userController.putUser(req, res, next)
  );
  // prettier-ignore
  router.delete("/users/:id", (req, res, next) => userController.deleteUser(req, res, next)
  );

  // USER FILTERS ROUTES

  router.get("/youngest", (req, res, next) =>
    userController.youngestUser(req, res, next)
  );
  router.get("/search", (req, res, next) =>
    userController.searchByName(req, res, next)
  );
  router.get("/average-age", (req, res, next) =>
    userController.averageAge(req, res, next)
  );
  router.get("/domain/:domain", (req, res, next) =>
    userController.domain(req, res, next)
  );

  router.post("/sort", (req, res, next) => userController.sort(req, res, next));

  // #endregion USER ROUTES ----------------
  /*
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
  */
  // Express 5 doc changed from "/*" to -> "/*Any-Name" for Page not found, else it thinks "*" is a PARAMS
  router.get("/*notfound", (req, res) => userController.notFound(req, res));
  return router;
}

export default routes;
