import mongoose from "mongoose";

const PurchasesStructure = new mongoose.Schema({
  userId: { type: Number, required: true },
  productId: { type: Number, required: true },
  date: { type: Date, default: new Date().toISOString() },
});

PurchasesStructure.index({ userId: 1, productId: 1 }, { unique: true });

const PurchasesModel = mongoose.model("Purchases", PurchasesStructure);

export default PurchasesModel;
