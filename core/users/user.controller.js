// #region Imports & Root & Repetitive functions ------------------------
import users from "../../sample_data/users.js";
import products from "../../sample_data/products.js";
import purchasesData from "../../sample_data/purchases.js";
import UsersModel from "./repository/usersModel.js";
import {
  usersService,
  targetUser,
  updateUserService,
  postUserService,
  deleteUserService,
} from "./user.service.js";

const root = (_, response) => {
  response.send(`
  <header style="width:100%; display:flex; flex-direction:column;">
    <h1 style="align-self:center">------------------------------- ROOT PAGE & SAMPLE DATA -------------------------------</h1>
    <div style="display:flex; flex-direction: row; justify-content:space-between;">
      <pre>
        USERS: -----------------------------------
        \n${JSON.stringify(users, null, 2)}
      </pre>
      <pre>
        PRODUCTS: --------------------------------
        \n${JSON.stringify(products, null, 2)}
      </pre>
      <pre>
        PURCHASES: -------------------------------
        \n${JSON.stringify(purchasesData, null, 2)}
      </pre>
    </div>
  </header>
  `);
};
// #endregion Root & Repetitive functions -------------------------------

// #region REGULAR USER CALLBACKS-------------
const getUsers = async (_, response) => {
  try {
    const allUsers = await usersService();
    response.status(200).send(allUsers);
  } catch (err) {
    response.status(500).json(err);
  }
};

const getUser = async (req, response) => {
  try {
    const params = req.params.id;
    if (params.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const foundUser = await targetUser(params);
      response.status(200).json(foundUser);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
};

const postUser = async (req, response) => {
  try {
    const requestedUser = req.body;
    const newUser = await postUserService(requestedUser);
    console.info("New user:", newUser);
    response.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
};

const putUser = async (req, response) => {
  try {
    const reqUserChange = req.body;
    const paramsID = req.params.id;
    if (paramsID.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const userToChange = await updateUserService(paramsID, reqUserChange);
      if (userToChange) {
        response.status(200).json(userToChange);
      } else {
        response.status(404).send("Couldn't find the User to change");
      }
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
};

const deleteUser = async (req, response) => {
  try {
    const deleteParams = req.params.id;
    if (deleteParams.toLowerCase().split("").length < 24) {
      response.status(400).send("The ID must be a Hex string of 24 characters");
    } else {
      const userToDelete = await deleteUserService(deleteParams);
      if (userToDelete !== null) {
        response.status(200).send(`DELETED USER: ${deleteParams}`);
      } else {
        response
          .status(404)
          .send(`ERROR 404: Couldn't find the User "${deleteParams}".`);
      }
    }
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
};
// #endregion REGULAR USER CALLBACKS----------

// #region ADVANCED USER FILTER CALLBACKS-----
const youngestUser = async (_, response) => {
  try {
    let usersArray;
    const listOfUsers = await UsersModel.find({});
    if (listOfUsers) {
      usersArray = listOfUsers;
    }
    let findYoungest = usersArray.length > 1 ? undefined : usersArray[0];
    usersArray.forEach((user) => {
      if (findYoungest === undefined) findYoungest = user;
      findYoungest = user.age < findYoungest.age ? user : findYoungest;
    });
    response.status(200).send(findYoungest);
  } catch (err) {
    response.status(500).json(err);
  }
};

const searchByName = (req, response) => {
  const name = req.query.name;
  if (name !== undefined) {
    console.info(name);
    const searchUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(name.toLowerCase());
    });
    console.info("searchUsers:", searchUsers);
    response.send(searchUsers);
  } else {
    const errorTxt =
      "'Name' query is Undefined. Either you didn't call it 'name', or the value is empty";
    console.error(errorTxt);
    response.send(errorTxt);
  }
};

const averageAge = (_, response) => {
  let ageAddition = 0;
  users.forEach((user) => {
    ageAddition += user.age;
  });
  const sum = Math.round(ageAddition / users.length);
  console.info("Average Age:", sum);
  response.status(200).send(`Average Age: ${sum} years`);
};

const sort = (req, response) => {
  const sortBy = req.body.sortBy;
  const reverse = req.body.reverse;
  console.info("sortBy:", sortBy);
  if (sortBy === "age") {
    const sortByAge = users.toSorted((a, b) => {
      const values = reverse === true ? [b, a] : [a, b];
      return values[0].age - values[1].age;
    });
    console.info(sortByAge);
    response.send(sortByAge);
  } else if (sortBy === "name") {
    const sortByName = users.toSorted((a, b) => {
      const values = reverse === true ? [b, a] : [a, b];
      return values[0].name.localeCompare(values[1].name);
    });
    console.info(sortByName);
    response.send(sortByName);
  } else {
    response.send("Wrong setting in SortBy !!! Use only 'age' or 'name'.");
    throw Error("WRONG SETTING in /SORT !!!");
  }
};

// Domain = Domain of an E-mail
const domain = (req, response) => {
  const domainSearch = req.params.domain;
  const wantedDomainUsers = users.filter((user) => {
    const selectUserDomain = user.email.split("@")[1].trim().toLowerCase();
    return selectUserDomain === domainSearch;
  });
  if (wantedDomainUsers !== undefined) {
    console.info(wantedDomainUsers);
    if (wantedDomainUsers.length === 0) {
      response
        .status(404)
        .send(
          "This domain doesn't exist. Please look at the list of Users again..."
        );
    } else {
      response.status(200).send(wantedDomainUsers);
    }
  }
};

// #endregion ADVANCED USER FILTER CALLBACKS--

// #region NOT EXISTING PAGES & EXPORTS --------------------------------------
const notFound = (req, response) => {
  const statusCode = 404;
  response.status(statusCode).send(
    `<h2 style="color:red;">ERROR ${statusCode}:</h2>
    <span style="font-family: calibri, sans-serif;">
       The route <strong style="font-size:20px">${req.url}</strong> doesn't exist
    </span>
    <a href="./">Go to Root</a>`
  );
};

export {
  root,
  notFound,
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  youngestUser,
  searchByName,
  averageAge,
  sort,
  domain,
};
// #endregion
