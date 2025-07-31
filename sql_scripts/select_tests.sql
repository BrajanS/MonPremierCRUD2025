SELECT users.*, purchases.*, products.* FROM users 
        LEFT JOIN purchases
        ON users.userID = purchases.purchase_userID 
        LEFT JOIN products ON products.productID = purchases.purchase_productID;