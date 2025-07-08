import mongoose from "mongoose";

const usersStructure = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const usersModel = mongoose.model(usersStructure);

export default usersModel;
