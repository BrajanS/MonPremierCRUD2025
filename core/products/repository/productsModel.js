import mongoose from "mongoose";

/**
 * @module productsModel
 * : Mongoose wanted Products model
 */
const ProductsStructure = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
});

const ProductsModel = mongoose.model("Products", ProductsStructure);

export default ProductsModel;
