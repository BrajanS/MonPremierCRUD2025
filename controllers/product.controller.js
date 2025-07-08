import products from "../data/products.js";
import { findFromArray } from "./user.controller.js";
import ProductsModel from "../models/productsModel.js";

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

const getProduct = async (req, response) => {
  try {
    const params = Number(req.params.id);
    const foundProductIndex = findFromArray(params, products);
    if (foundProductIndex) {
      const foundProduct = products[foundProductIndex];
      if (response.statusCode === 200) {
        if (foundProduct) {
          console.info(foundProduct);
          response.status(200).send(foundProduct);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const postProduct = async (req, response) => {
  try {
    const requestedProduct = req.body;
    console.info("POST:", response.statusCode, requestedProduct);
    const isDuplicate = products.some((item) => {
      return JSON.stringify(item) === JSON.stringify(requestedProduct);
    });
    if (!isDuplicate) {
      if (response.statusCode === 200) {
        response.status(200);
        products.push(requestedProduct);
        response.send(products);
      }
    } else {
      console.error("THE POST request IS A DUPLICATE !!!!!!!!!!!");
    }
  } catch (error) {
    console.error(error);
  }
};

const putProduct = async (req, response) => {
  try {
    const reqProductChange = req.body;
    const productReplacement = {};
    const paramsID = Number(req.params.id);
    console.info("PUT PRE:", products);
    const productToChangeIndex = findFromArray(paramsID, products);
    if (productToChangeIndex !== undefined) {
      productReplacement.id = products[productToChangeIndex].id;
      Object.assign(productReplacement, reqProductChange);
      // productReplacement replaces the Product in products with Splice()
      products.splice(productToChangeIndex, 1, productReplacement);
      response.status(200);
      console.info("PUT AFTER:", products);
      response.status(200).send(products);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, response) => {
  try {
    const deleteParams = Number(req.params.id);
    console.info("deleteIndex:", deleteParams);
    const productIndex = findFromArray(deleteParams, products);
    if (productIndex !== undefined) {
      console.info("DELETE PRE:", products);
      products.splice(productIndex, 1);
      console.info("DELETE AFTER:", products);
      response.send(products);
    }
  } catch (error) {
    console.error(error);
  }
};

export { getProducts, getProduct, postProduct, putProduct, deleteProduct };
