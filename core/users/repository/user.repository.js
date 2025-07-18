import UsersModel from "./usersModel.js";

export default class UserRepository {
  // #region CLASSIC ---------------
  async getUsers() {
    try {
      const usersArray = await UsersModel.find();
      return usersArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async user(paramsID) {
    try {
      const foundUser = await UsersModel.find({ _id: paramsID });
      if (foundUser.length !== 0) {
        console.info("Found the User");
        return foundUser;
      } else {
        console.error("Couldn't find the User by that _id");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async makeUser(jsonBody) {
    return await UsersModel.create(jsonBody);
  }

  async updateById(id, data) {
    return await UsersModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
  }

  async begoneUser(erasedUser) {
    return await UsersModel.findByIdAndDelete(erasedUser);
  }
  // #endregion CLASSIC ------------
  // #region FILTERS ---------------
  async kidUser() {
    return await UsersModel.find({});
  }
  // #endregion FILTERS ------------
}
