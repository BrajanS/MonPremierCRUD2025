import mongoose from "mongoose";

const PurchasesStructure = new mongoose.Schema({
  userId: { type: Number, required: true },
  productId: { type: String, required: true, unique: true },
  date: { type: Date, default: new Date().toISOString() },
});

const PurchasesModel = mongoose.model("Purchases", PurchasesStructure);

export default PurchasesModel;
