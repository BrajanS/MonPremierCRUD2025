// #region IMPORTS
import express from "express";
import {
  root,
  notFound,
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  youngestUser,
  sort,
  searchByName,
  averageAge,
  domain,
} from "../core/users/user.controller.js";
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
// #endregion IMPORTS

const router = express.Router();

router.get("/", root);

// #region USER ROUTES -------------------
router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.post("/users", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

// USER FILTERS ROUTES

router.get("/youngest", youngestUser);
router.get("/search", searchByName);
router.get("/average-age", averageAge);
router.get("/domain/:domain", domain);

router.post("/sort", sort);

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
router.get("/*notfound", notFound);

export { router };
