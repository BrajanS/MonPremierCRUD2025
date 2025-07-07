// #region Imports & Root & Repetitive functions ------------------------
import users from "../models/users.js";

function findFromArray(paramsID, array) {
  if (Array.isArray(array) && typeof paramsID === "number") {
    const objectIndexArray = array.findIndex((item) => {
      return item.id === paramsID;
    });
    if (objectIndexArray !== undefined) {
      return objectIndexArray;
    }
  }
}

const root = (_, response) => {
  response.send(`<pre>
  ------------------------------- ROOT PAGE -------------------------------\n
    
    Imported data: \n
  PRODUCTS: -----------------------------------
  \n${JSON.stringify(products, null, 2)}
  USERS: -----------------------------------
  \n${JSON.stringify(users, null, 2)}
  PURCHASES: -----------------------------------
  \n${JSON.stringify(purchases, null, 2)}</pre>`);
};
// #endregion Root & Repetitive functions -------------------------------

// #region REGULAR USER CALLBACKS-------------
const getUsers = (_, response) => {
  if (response.statusCode === 200) {
    console.info(response.statusCode);
  }
  response.status(200).send(users);
};

const getUser = (req, response) => {
  try {
    const params = Number(req.params.id);
    const foundUserIndex = findFromArray(params, users);
    if (foundUserIndex) {
      const foundUser = users[foundUserIndex];
      if (response.statusCode === 200) {
        if (foundUser) {
          console.info(foundUser);
          response.status(200).send(foundUser);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const postUser = (req, response) => {
  try {
    const requestedUser = req.body;
    console.info("POST:", response.statusCode, requestedUser);
    const isDuplicate = users.some((item) => {
      return JSON.stringify(item) === JSON.stringify(requestedUser);
    });
    if (!isDuplicate) {
      if (response.statusCode === 200) {
        response.status(200);
        users.push(requestedUser);
        response.send(users);
      }
    } else {
      console.error("THE POST request IS A DUPLICATE !!!!!!!!!!!");
    }
  } catch (error) {
    console.error(error);
  }
};

const putUser = (req, response) => {
  try {
    const reqUserChange = req.body;
    const userReplacement = {};
    const paramsID = Number(req.params.id);
    console.info("PUT PRE:", users);
    const userToChangeIndex = findFromArray(paramsID, users);
    if (userToChangeIndex !== undefined) {
      userReplacement.id = users[userToChangeIndex].id;
      Object.assign(userReplacement, reqUserChange);
      // userReplacement replaces the User in Users with Splice()
      users.splice(userToChangeIndex, 1, userReplacement);
      console.info("PUT AFTER:", users);
      response.status(200).send(users);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = (req, response) => {
  try {
    const deleteParams = Number(req.params.id);
    console.info("deleteIndex:", deleteParams);
    const userIndex = findFromArray(deleteParams, users);
    if (userIndex !== undefined) {
      console.info("DELETE PRE:", users);
      users.splice(userIndex, 1);
      console.info("DELETE AFTER:", users);
      response.send(users);
    }
  } catch (error) {
    console.error(error);
  }
};
// #endregion REGULAR USER CALLBACKS----------

// #region ADVANCED USER FILTER CALLBACKS-----
const youngestUser = (_, response) => {
  let findYoungest = users.length > 1 ? undefined : users[0];
  console.info(findYoungest);
  users.forEach((user) => {
    if (findYoungest === undefined) findYoungest = user;
    findYoungest = user.age < findYoungest.age ? user : findYoungest;
  });
  console.info("YOUNGEST USER:", findYoungest);
  response.status(200).send(findYoungest);
};

const searchByName = (req, response) => {};

const averageAge = (_, response) => {
  let ageAddition = 0;
  users.forEach((user) => {
    ageAddition += user.age;
  });
  const sum = Math.round(ageAddition / users.length);
  console.info("Average Age:", sum);
  response.status(200).send(`Average Age: ${sum} years`);
};

const sort = (_, response) => {};

// Domain = Domain of an E-mail
const domain = (req, response) => {
  const domainSearch = req.params.domain;
  const wantedDomainUsers = users.filter((user) => {
    const selectUserDomain = user.email.split("@")[1];
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
  findFromArray,
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
