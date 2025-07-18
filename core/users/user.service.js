import UserRepository from "./repository/user.repository.js";

// #region CLASSIC
const usersService = async () => {
  return await new UserRepository().getUsers();
};

const targetUser = async (userID) => {
  return await new UserRepository().user(userID);
};

const postUserService = async (reqBody) => {
  return await new UserRepository().makeUser(reqBody);
};

const updateUserService = async (id, updateData) => {
  return await new UserRepository().updateById(id, updateData);
};

const deleteUserService = async (deleteId) => {
  return await new UserRepository().begoneUser(deleteId);
};
// #endregion CLASSIC
// #region FILTERS
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
