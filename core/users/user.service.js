import UserRepository from "./repository/user.repository.js";

/**
 * @typedef {Promise<Array<Object>>} POA - A promise about an array of objects (Promise<Array<Object>>)
 * @typedef {Promise<Object|null>} POn - A promise of an Object of the User or Null (Promise<Object|null>)
 * @typedef {Promise<Object>} PO - A promise of an Object (Promise<Object>)
 */

// #region CLASSIC
/**
 * Service to get ALL Users
 * @function
 * @returns {POA} A promise about an array of User objects.
 */
const usersService = async () => {
  return await new UserRepository().getUsers();
};

/**
 * Service to get User by ID
 * @function
 * @param {string} userID - ObjectId of the User
 * @returns {POA} A promise about an array of User objects.
 */
const targetUser = async (userID) => {
  return await new UserRepository().user(userID);
};

/**
 * Service to create a new User
 * @function
 * @param {Object} reqBody - JSON body containing the new user data.
 * @returns {PO} A promise of an Object of the Created User
 */
const postUserService = async (reqBody) => {
  return await new UserRepository().makeUser(reqBody);
};

/**
 * Service to Update User (from ID)
 * @function
 * @param {string} id - ObjectId of the User
 * @param {Object} updateData - Update Data JSON
 * @returns {POn} A promise of an Object of the User or Null
 */
const updateUserService = async (id, updateData) => {
  return await new UserRepository().updateById(id, updateData);
};

/**
 * Service to delete a user by ID.
 * @function
 * @param {string} deleteId - ObjectId of the User to Delete
 * @returns {POn} A promise of an Object of the User or Null
 */
const deleteUserService = async (deleteId) => {
  return await new UserRepository().begoneUser(deleteId);
};

// #endregion CLASSIC

// #region FILTERS

/**
 * Service to get the youngest User
 * @function
 * @returns {POA} A promise about an array of User objects.
 */
const youngestUserService = async () => {
  return await new UserRepository().kidUser();
};

// #endregion FILTERS

export {
  usersService,
  targetUser,
  postUserService,
  updateUserService,
  deleteUserService,
  youngestUserService,
};
