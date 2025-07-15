import mongoose from "mongoose";

const UsersStructure = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const UsersModel = mongoose.model("Users", UsersStructure);

export default UsersModel;
