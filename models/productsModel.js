import mongoose, { Schema } from "mongoose";

const ProductsStructure = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Schema.Types.Decimal128, required: true },
});

const ProductsModel = mongoose.model("Products", ProductsStructure);

export default ProductsModel;
