import mongoose, { Schema } from "mongoose";

const productsStructure = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  price: { type: Schema.Types.Decimal128, required: true },
});

const productsModel = mongoose.model(productsStructure);

export default productsModel;
