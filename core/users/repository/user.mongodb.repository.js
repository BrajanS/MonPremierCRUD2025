import DatabaseException from "../../../exceptions/database.exception.js";
import UsersModel from "./usersModel.js";

/**
 * - Repository Class for User
 * @class
 *
 * @typedef {Promise<Array<Object>>} POA - A promise about an array of objects (Promise<Array<Object>>)
 * @typedef {Promise<Object|null>} POn - A promise of an Object of the User or Null (Promise<Object|null>)
 * @typedef {Promise<Object>} PO - A promise of an Object (Promise<Object>)
 *
 * @module UserRepository
 * : Class for User manipulations
 *
 */
export default class UserRepository {
  // #region CLASSIC ---------------
  /**
   * Get all Users
   * @returns {POA} A promise about an array of User objects.
   * @throws {Error} Error handling
   */
  async getUsers() {
    try {
      const usersArray = await UsersModel.find();
      return usersArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Get User by ID
   * @param {string} paramsID - ObjectId of the User
   * @returns {POA} A promise about an Array that has a User object
   * @throws {Error} Error handling
   */
  async user(paramsID) {
    try {
      const foundUser = await UsersModel.find({
        _id: paramsID,
      });
      if (foundUser.length !== 0) {
        console.info("Found the User");
        return foundUser;
      } else {
        console.error("Couldn't find the User by that _id");
      }
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  /**
   * Create User with Requested JSON body
   * @param {Object} jsonBody - User data
   * @returns {PO} A promise of an Object of the Created User
   */
  async makeUser(jsonBody) {
    return await UsersModel.create(jsonBody);
  }

  /**
   * Updates User by ID
   * @param {string} id - ObjectId of User to change
   * @param {Object} data - Update data
   * @returns {POn} A promise of an Object of the User or Null
   */
  async updateById(id, data) {
    return await UsersModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
  }

  /**
   * Delete user by ID
   * @param {string} erasedUser - ObjectId of User to delete
   * @returns {POn} A promise of an Object of the User or Null
   */
  async begoneUser(erasedUser) {
    return await UsersModel.findByIdAndDelete(erasedUser);
  }

  // #endregion CLASSIC ------------

  // #region FILTERS ---------------
  /**
   * Gets ALL users, to start finding the youngest User in the Controller
   * @returns {POA} A promise of an Array that contains Objects (Users)
   */
  async kidUser() {
    return await UsersModel.find({});
  }
  // #endregion FILTERS ------------
}
