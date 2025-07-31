CREATE TABLE IF NOT EXISTS users(
	userID INT PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(16) NOT NULL,
	userAge INT NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
	productID INT PRIMARY KEY AUTO_INCREMENT,
	productName VARCHAR(20) UNIQUE NOT NULL,
	productPrice FLOAT NOT NULL,
	CHECK(productPrice >= 0)	
);

CREATE TABLE IF NOT EXISTS purchases (
	purchase_userID INT NOT NULL,
	purchase_productID INT NOT NULL,
	purchaseDate DATETIME DEFAULT NOW(),
	PRIMARY KEY (purchase_userID, purchase_productID),
	CONSTRAINT fk_userID FOREIGN KEY (purchase_userID) REFERENCES users(userID),
	CONSTRAINT fk_productID FOREIGN KEY (purchase_productID) REFERENCES products(productID)
);

CREATE TABLE IF NOT EXISTS Cours(
	id_cours INT PRIMARY KEY AUTO_INCREMENT,
	name_cours VARCHAR(70) NOT NULL,
	id_etudiants INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Maitresse(
	id_maitresse INT PRIMARY KEY AUTO_INCREMENT,
	name_maitresse VARCHAR(50) NOT NULL,
	id_matiere_m INT NOT NULL
	
);

CREATE TABLE IF NOT EXISTS Etudiants(
	etudiant_id INT NOT NULL,
	cours_id INT NOT NULL,
	PRIMARY KEY(etudiant_id, cours_id),
	CONSTRAINT fk_etudiant FOREIGN KEY (etudiant_id) REFERENCES users(userID),
	CONSTRAINT fk_cours FOREIGN KEY (cours_id) REFERENCES Cours(id_cours)
);