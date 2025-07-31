class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  userStructurator(queryData) {
    const dataSelect = queryData[0];
    console.log(dataSelect);

    for (let i = 0; i < dataSelect.length; i++) {
      let baseValue = 0;
    }
    let checkIndex = 1;
    let customArray;
    const orderDuplications = dataSelect.map((jsonObj) => {
      if (jsonObj["userID"] === checkIndex) {
        checkIndex++;
      } else {
      }
    });
    const filterData = dataSelect.map((joins, index) => {
      // Joins Structure and where the data will be
      const cleanPurchases = {
        purchase_productID: joins["purchase_productID"],
        product: {
          productName: joins["productName"],
          productPrice: joins["productPrice"],
        },
        purchaseDate: joins["purchaseDate"],
      };
      console.log(`Joins ${index}`, joins);
      return [cleanPurchases];
    });
    // console.log(queryData[0]);
    const {
      purchase_userID,
      purchase_productID,
      purchaseDate,
      productID,
      date,
      productName,
      productPrice,
      ...cleanUser
    } = queryData[0]["0"];
    cleanUser.purchases = filterData;
    return cleanUser;
  }

  async getUsers() {
    try {
      const pool = await this.pool;
      const users = await pool.query(`
        SELECT users.*, purchases.*, products.* FROM users 
        LEFT JOIN purchases ON purchases.purchase_userID = users.userID
        LEFT JOIN products ON products.productID = purchases.purchase_productID
      `);
      const cleanedUsers = this.userStructurator(users);
      return cleanedUsers;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async user(userID) {
    try {
      const pool = await this.pool;
      const id_user = Number(userID);
      if (typeof id_user !== "number") {
        throw new Error("The userID must be a INTEGER");
      } else {
        const targetedUser = await pool.query(`
        SELECT users.*, purchases.*, products.* FROM users 
        LEFT JOIN purchases
        ON users.userID = purchases.purchase_userID 
        LEFT JOIN products 
        ON products.productID = purchases.purchase_productID
          WHERE users.userID = ${id_user};   
        `);
        if (targetedUser[0][0]["userID"] === id_user) {
          const cleanedUser = this.userStructurator(targetedUser);
          return cleanedUser;
        } else {
          throw new Error(`The User ${id_user} doesn't exist`);
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default UserRepository;
