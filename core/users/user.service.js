/**
 * @typedef {Promise<Array<Object>>} POA - A promise about an array of objects (Promise<Array<Object>>)
 * @typedef {Promise<Object|null>} POn - A promise of an Object of the User or Null (Promise<Object|null>)
 * @typedef {Promise<Object>} PO - A promise of an Object (Promise<Object>)
 */

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  // #region CLASSIC
  /**
   * Service to get ALL Users
   * @function
   * @returns {POA} A promise about an array of User objects.
   */
  async usersService() {
    return await this.userRepository.getUsers();
  }

  /**
   * Service to get User by ID
   * @function
   * @param {string} userID - ObjectId of the User
   * @returns {POA} A promise about an array of User objects.
   */
  async targetUser(userID) {
    return await this.userRepository.user(userID);
  }

  /**
   * Service to create a new User
   * @function
   * @param {Object} reqBody - JSON body containing the new user data.
   * @returns {PO} A promise of an Object of the Created User
   */
  async postUserService(reqBody) {
    return await this.userRepository.makeUser(reqBody);
  }

  /**
   * Service to Update User (from ID)
   * @function
   * @param {string} id - ObjectId of the User
   * @param {Object} updateData - Update Data JSON
   * @returns {POn} A promise of an Object of the User or Null
   */
  async updateUserService(id, updateData) {
    return await this.userRepository.updateById(id, updateData);
  }

  /**
   * Service to delete a user by ID.
   * @function
   * @param {string} deleteId - ObjectId of the User to Delete
   * @returns {POn} A promise of an Object of the User or Null
   */
  async deleteUserService(deleteId) {
    return await this.userRepository.begoneUser(deleteId);
  }

  // #endregion CLASSIC

  // #region FILTERS

  /**
   * Service to get the youngest User
   * @function
   * @returns {POA} A promise about an array of User objects.
   */
  async youngestUserService() {
    return await this.userRepository.kidUser();
  }

  // #endregion FILTERS
}

export default UserService;
