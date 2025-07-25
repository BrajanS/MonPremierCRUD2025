import ProductsModel from "./repository/productsModel.js";

/**
 * @module productsController
 * : All the Controllers that verify each Products routes
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

/**
 * @param {ignoredReq} - Useless Request from Express, not Used so ignored
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
const getProducts = async (_, response) => {
  try {
    const dbProduct = await ProductsModel.find({});
    if (dbProduct) {
      response.status(200).send(dbProduct);
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

/**
 * @param {Req} - Request from Express by POSTMAN (Rest API)
 * @param {Res} - Response to the Express Server or POSTMAN
 * @returns {Pvoid} - Returns Nothing
 */
const getProduct = async (req, response) => {
  try {
    const params = req.params.id;
    if (params.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const findProduct = await ProductsModel.findOne({ _id: params });
      if (findProduct) {
        response.status(200).json(findProduct);
      } else {
        response.status(404).send("Couldn't find the Product");
      }
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
const postProduct = async (req, response) => {
  try {
    const requestedProduct = req.body;
    console.info("requestedProduct:", requestedProduct);
    const newProduct = await ProductsModel.create(requestedProduct);
    if (newProduct) {
      console.info(newProduct);
      response.status(200).send(newProduct);
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
const putProduct = async (req, response) => {
  try {
    const reqProductChange = req.body;
    const paramsID = req.params.id;
    if (paramsID.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const productToChange = await ProductsModel.findByIdAndUpdate(
        paramsID,
        reqProductChange
      );
      if (productToChange) {
        response.status(200).json(productToChange);
      } else {
        response.status(404).send("Couldn't find the product to Change");
      }
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
const deleteProduct = async (req, response) => {
  try {
    const deleteParams = req.params.id;
    if (deleteParams.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const deleteProduct = await ProductsModel.findByIdAndDelete(deleteParams);
      if (deleteProduct) {
        response.status(200).json(deleteProduct);
      } else {
        response.status(404).send("Couldn't find the Product to Delete");
      }
    }
  } catch (err) {
    console.error(err);
    response.status(500).json(err);
  }
};

export { getProducts, getProduct, postProduct, putProduct, deleteProduct };
