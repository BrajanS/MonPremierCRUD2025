// #region IMPORTS
import "dotenv/config";
import connectMongoDb from "./database/connectDb.js"; // adjust if path differs
import UsersModel from "./core/users/repository/usersModel.js";
import ProductsModel from "./core/products/repository/productsModel.js";
import PurchasesModel from "./core/purchases/repository/purchasesModel.js";
// #endregion IMPORTS

// #region Base Users & Products
const usersBase = [
  { name: "Alice", age: 28, email: "alice@gmail.com" },
  { name: "Bob", age: 32, email: "bob@yahoo.com" },
  { name: "Charlie", age: 25, email: "charlie@outlook.com" },
];

const productsBase = [
  { name: "Clavier", price: 49.99 },
  { name: "Souris", price: 19.99 },
  { name: "Écran", price: 159.0 },
];
// #endregion ------------------

async function seedGenerate() {
  try {
    await connectMongoDb();

    await UsersModel.deleteMany({});
    await ProductsModel.deleteMany({});
    await PurchasesModel.deleteMany({});

    const users = await UsersModel.insertMany(usersBase);
    const products = await ProductsModel.insertMany(productsBase);
    const purchasesBase = [
      {
        userId: users[0]._id, // Alice
        productId: products[2]._id, // Écran
        date: "2025-07-03T10:00:00.000Z",
      },
      {
        userId: users[1]._id, // Bob
        productId: products[1]._id, // Souris
        date: "2025-07-03T11:15:00.000Z",
      },
      {
        userId: users[0]._id, // Alice again
        productId: products[0]._id, // Clavier
        date: "2025-07-03T11:45:00.000Z",
      },
    ];

    await PurchasesModel.insertMany(purchasesBase);

    console.info("✅ Seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedGenerate();
