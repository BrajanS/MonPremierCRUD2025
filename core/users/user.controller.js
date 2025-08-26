// #region Imports & Root & Repetitive functions ------------------------
import users from "../../sample_data/users.js";
import products from "../../sample_data/products.js";
import purchasesData from "../../sample_data/purchases.js";
/**
 * @module userController
 * : All the Controllers that verify each User routes
 */

/**
 * -> Request from Express
 * @typedef {Object} Req
 * -> Request from Express
 * @typedef {Object} Res
 * -> Promise without Returns to Caller
 * @typedef {Promise<void>} Pvoid
 * -> Ignored ("_" -> Not used) Request from Express
 * @typedef {Object} ignoredReq
 * -> Ignored ("_" -> Not used) Response from Express
 * @typedef {Object} ignoredRes
 */

class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  /**
   * The Welcome page, display "sample_data" JSON's
   * @param {ignoredReq} - Useless Request from Express, not Used so ignored
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  root(_, response) {
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
  }
  // #endregion Root & Repetitive functions -------------------------------

  // #region REGULAR USER CALLBACKS-------------
  /**
   * Controller getting all Users
   * @param {ignoredReq} - Useless Request from Express, not Used so ignored
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async getUsers(_, response, next) {
    try {
      const allUsers = await this.userService.usersService();
      response.status(200).send(allUsers);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Controller for getting 1 User, by ObjectId
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async getUser(req, response, next) {
    try {
      const params = req.params.id;
      if (process.env.TYPE_DB === "mariadb") {
        const foundUser = await this.userService.targetUser(params);
        response.status(200).json(foundUser);
      } else {
        if (params.toLowerCase().split("").length < 24) {
          response
            .status(400)
            .send("The ID must be a Hex string of 24 characters");
        } else {
          const foundUser = await this.userService.targetUser(params);
          response.status(200).json(foundUser);
        }
      }
    } catch (error) {
      next(error);
    }
  }
  /**
   * Controller to Create a new User
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async postUser(req, response) {
    try {
      const requestedUser = req.body;
      const newUser = await this.userService.postUserService(requestedUser);
      console.info("New user:", newUser);
      response.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      response.status(500).json(error);
    }
  }
  /**
   * Controller to Update the ObjectId's User
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async putUser(req, response) {
    try {
      const reqUserChange = req.body;
      const paramsID = req.params.id;
      if (paramsID.toLowerCase().split("").length < 24) {
        response
          .status(400)
          .send("The ID must be a Hex string of 24 characters");
      } else {
        const userToChange = await this.userService.updateUserService(
          paramsID,
          reqUserChange
        );
        if (userToChange) {
          response.status(200).json(userToChange);
        } else {
          response.status(404).send("Couldn't find the User to change");
        }
      }
    } catch (error) {
      next(error);
    }
  }
  /**
   * Controller to Delete the ObjectId's User from MongoDb
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async deleteUser(req, response) {
    try {
      const deleteParams = req.params.id;
      if (deleteParams.toLowerCase().split("").length < 24) {
        response
          .status(400)
          .send("The ID must be a Hex string of 24 characters");
      } else {
        const userToDelete = await this.userService.deleteUserService(
          deleteParams
        );
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
  }
  // #endregion REGULAR USER CALLBACKS----------

  // #region ADVANCED USER FILTER CALLBACKS-----
  /**
   * Controller to find the Youngest User of the bunch
   * @param {ignoredReq} - Useless Request from Express, not Used so ignored
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  async youngestUser(_, response) {
    try {
      let usersArray;
      const listOfUsers = await this.userService.youngestUserService();
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
  }

  /**
   * Controller to search a User's name with the URL Query
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  searchByName(req, response) {
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
  }

  /**
   * Controller to find the Average age between all Users
   * @param {ignoredReq} - Useless Request from Express, not Used so ignored
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  averageAge(_, response) {
    let ageAddition = 0;
    users.forEach((user) => {
      ageAddition += user.age;
    });
    const sum = Math.round(ageAddition / users.length);
    console.info("Average Age:", sum);
    response.status(200).send(`Average Age: ${sum} years`);
  }

  /**
   * Controller to Sort Users by Age or Name (in ASC or DESC)
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing
   */
  sort(req, response) {
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
  }

  /**
   * Controller to find all Users who's E-mail domain correspond to the Query
   * @param {Req} - Request from Express by POSTMAN (Rest API)
   * @param {Res} - Response to the Express Server or POSTMAN
   * @returns {Pvoid} - Returns Nothing Domain = Domain of an E-mail
   */
  domain(req, response) {
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
  }

  // #endregion ADVANCED USER FILTER CALLBACKS--

  // #region NOT EXISTING PAGES --------------------------------------
  /**
   * Error Message if the Route doesn't exist (the Opposite of the welcome page)
   * @param {Req} - Request from Express by POSTMAN (Rest API) - Gets the URL for the Error message
   * @param {Res} - Response to the Express Server or POSTMAN - Shows the Error message, of Page not found
   * @returns {Pvoid} - Returns Nothing
   * Handles the Error message when the Route doesn't exist
   */
  notFound(req, response) {
    const statusCode = 404;
    response.status(statusCode).send(
      `<h2 style="color:red;">ERROR ${statusCode}:</h2>
    <span style="font-family: calibri, sans-serif;">
       The route <strong style="font-size:20px">${req.url}</strong> doesn't exist
    </span>
    <a href="./">Go to Root</a>`
    );
  }
  // #endregion
}

export default UserController;
