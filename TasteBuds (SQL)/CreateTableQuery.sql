DROP TABLE IF EXISTS Pantry;
DROP TABLE IF EXISTS Recipe_Ingredient_Junction;
DROP TABLE IF EXISTS Favourite_recipes;
DROP TABLE IF EXISTS Shopping_cart;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
    [User_id] int IDENTITY(1,1) PRIMARY KEY,
    Username varchar(50) NOT NULL,
    First_name varchar(50) NOT NULL,
	Last_name varchar(50),
	Pwd varchar(50) NOT NULL,
	Email varchar(50) NOT NULL,
);

CREATE TABLE Ingredient (
    Ingredient_id int IDENTITY(1,1) PRIMARY KEY,
    Ingredient_name varchar(50) NOT NULL,
    Is_Vegan tinyint NOT NULL,
	Is_Vegetarian tinyint NOT NULL,
	Is_GlutenFree tinyint NOT NULL,
);

CREATE TABLE Recipe (
    Recipe_id int NOT NULL,
    Recipe_name varchar(50) NOT NULL,
	Recipe_link varchar(250) NOT NULL,
	Cook_time varchar(50) NOT NULL,
    Is_Vegan tinyint NOT NULL,
	Is_Vegetarian tinyint NOT NULL,
	Is_GlutenFree tinyint NOT NULL,
	Nutritional_facts varchar(50),
	Portion_size int NOT NULL,
    PRIMARY KEY (Recipe_id),
);

CREATE TABLE Shopping_cart (
	[User_id] int NOT NULL,
	Ingredient_id int NOT NULL,
	Quantity decimal(12,4) NOT NULL,
	Quantity_measurement varchar(50) NOT NULL,
    PRIMARY KEY ([User_id], Ingredient_id),
	FOREIGN KEY ([User_id]) REFERENCES [User]([User_id]),
	FOREIGN KEY (Ingredient_id) REFERENCES Ingredient(Ingredient_id)
);

CREATE TABLE Favourite_recipes (
    List_id int NOT NULL,
	[User_id] int NOT NULL,
	Recipe_id int NOT NULL,
    PRIMARY KEY (List_id),
	FOREIGN KEY ([User_id]) REFERENCES [User]([User_id]),
	FOREIGN KEY (Recipe_id) REFERENCES Recipe(Recipe_id)
);

CREATE TABLE Recipe_Ingredient_Junction (
	Recipe_id int NOT NULL,
	Ingredient_id int NOT NULL,
	Quantity decimal(12,4) NOT NULL,
	Quantity_measurement varchar(50) NOT NULL,
	PRIMARY KEY (Recipe_id, Ingredient_id),
	FOREIGN KEY (Recipe_id) REFERENCES Recipe(Recipe_id),
	FOREIGN KEY (Ingredient_id) REFERENCES Ingredient(Ingredient_id)
);

CREATE TABLE Pantry (
	[User_id] int NOT NULL,
	Ingredient_id int NOT NULL,
	Quantity decimal(12,4) NOT NULL,
	Measurement varchar(50) NOT NULL,
	PRIMARY KEY ([User_id], Ingredient_id),
	FOREIGN KEY ([User_id]) REFERENCES [User]([User_id]),
	FOREIGN KEY (Ingredient_id) REFERENCES Ingredient(Ingredient_id)
);

-- Insert User
INSERT INTO [User] (Username, First_name, Last_name, Pwd, Email)
VALUES
	('TestUser', 'Test', 'User', 'password', 'testuser@unbc.ca'),
	('JoshPhang', 'Josh', 'Phang', 'password123', 'phang@unbc.ca'),
	('mars','Carlos','Rod','something','carl123@gmail.com'),
	('PreetPatel', 'Preet', 'Patel', '123456', 'ppatel2@unbc.ca');

-- Insert Ingredient
INSERT INTO Ingredient (Ingredient_name, Is_Vegan, Is_Vegetarian, Is_GlutenFree)
VALUES
	('Chicken Drumsticks', 0, 0, 1),
	('Hot Pepper Sauce', 0, 0, 1),
	('Vegetable Oil', 1, 1, 1),
	('All-Purpose Flour', 1, 1, 0),
	('Yellow Cornmeal', 1, 1, 0),
	('Salt', 1, 1, 1),

	('Linguine Pasta', 1, 1, 0),
	('Butter', 0, 0, 1),
	('Onion', 1, 1, 1),
	('Garlic', 1, 1, 1),
	('Shrimp', 0, 0, 1),
	('Half-and-Half Cream', 0, 0, 1),
	('Black Pepper', 1, 1, 1),
	('Parmesan Cheese', 0, 0, 1),
	('Parsley', 1, 1, 1),
	('Lemon', 1, 1, 1),

	('Spaghetti Pasta', 1, 1, 0),       
    ('Tomato Sauce', 1, 1, 1),             
    ('Olive Oil', 1, 1, 1),                                 
    ('Basil', 1, 1, 1),

	('Ground Beef Patty', 0, 0, 1),         -- Beef patty, not vegan or vegetarian but gluten-free
    ('Burger Bun', 0, 1, 0),                  -- Regular bun, not gluten-free
    ('Cheddar Cheese', 0, 1, 1),            -- Cheese slice, not vegan but vegetarian and gluten-free
    ('Lettuce', 1, 1, 1),                    -- Lettuce leaf, suitable for all dietary preferences
    ('Tomato Slice', 1, 1, 1),              -- Tomato slice
    ('Pickles', 1, 1, 1),                  -- Pickles for extra flavor
    ('Ketchup', 1, 1, 1),                     -- Ketchup
    ('Mustard', 1, 1, 1),                     -- Mustard

	('Large Eggs', 0, 0, 1),
	('Grated Cheese', 0, 1, 1),
	('Cherry Tomatoes', 1, 1, 1),
	('Chopped Basil', 1, 1, 1),

	('Blanched silver almonds', 1, 1, 1),
	('Mayonnaise', 1, 1, 1),
	('Lemon Juice', 1, 1, 1),
	('Chopped Chicken', 0, 0, 1),
	('Celery Stalks', 1, 1, 1);

-- Insert Recipe
INSERT INTO Recipe (Recipe_id, Recipe_name, Recipe_link, Cook_time, Is_Vegan, Is_Vegetarian, Is_GlutenFree, Nutritional_facts, Portion_size)
VALUES
	(1, 'Firecracker Fried Chicken Drumsticks', 'https://www.allrecipes.com/recipe/25492/firecracker-fried-chicken-drumsticks/',
		'25 min', 0, 0, 0, '475 Calories, 28g Fat, 12g Carbs, 42g Protein', 4),
	(2, 'Shrimp Linguine Alfredo', 'https://www.allrecipes.com/recipe/12780/shrimp-linguine-alfredo/',
		'35 min', 0, 0, 0, '590 Calories, 24g Fat, 70g Carbs, 28g Protein', 4),
	(3, 'Spaghetti Marinara','https://www.foodnetwork.com/recipes/food-network-kitchen/spaghetti-marinara-3622508',
		'30 minutes', 1, 1, 0, '300 kcal per serving', 2),
	(4, 'Hamburger','https://www.allrecipes.com/recipe/25473/the-perfect-basic-burger/',
		'15 minutes', 0, 0, 0, '500 kcal per serving', 1),
	(5, 'Omelette', 'https://www.simplyrecipes.com/recipes/how_to_make_an_omelet/',
		'6 min', 0, 0, 0, 'High in Protien with good amount of healthy fats', 4),
	(6, 'Chicken Salad', 'https://www.allrecipes.com/recipe/8499/basic-chicken-salad/',
		'6 min', 0, 0, 1, '779 Calories, 63g Fat, 8g Carbs, 44g Protein', 2);

-- Insert Shopping Cart
INSERT INTO Shopping_cart([User_id], Ingredient_id, Quantity, Quantity_measurement)
VALUES
	(1, 1, 8, 'pcs'),
	(2, 27, 15, 'ml'),
	(3, 32, 2, 'pcs');

-- Insert Recipe_Ingredient Junction
INSERT INTO Recipe_Ingredient_Junction (Recipe_id, Ingredient_id, Quantity, Quantity_measurement)
VALUES
	(1, 1, 8, 'pcs'),
	(1, 2, 0.25, 'cup'),
	(1, 3, 1, 'qt'),
	(1, 4, 0.33, 'cup'),
	(1, 5, 2, 'tbsp'),
	(1, 6, 0.5, 'tsp'),

	(2, 7, 12, 'oz'),
	(2, 8, 0.25, 'cup'),
	(2, 9, 4, 'tbsp'),
	(2, 10, 4, 'tsp'),
	(2, 11, 40, 'ea'),
	(2, 12, 1, 'cup'),
	(2, 13, 2, 'tsp'),
	(2, 14, 6, 'tbsp'),
	(2, 15, 4, 'pcs'),
	(2, 16, 1, 'ea'),

	(3, 17, 500, 'grams'),
	(3, 18, 200, 'ml'),
	(3, 19, 50, 'ml'),
	(3, 10, 3, 'cloves'),
	(3, 6, 10, 'grams'),
	(3, 13, 5, 'grams'),
	(3, 20, 5, 'grams'),

	(4, 21, 1, 'patty'),
	(4, 22, 5, 'buns'),
	(4, 23, 5, 'slices'),
	(4, 24, 5, 'leaf'),
	(4, 25, 1, 'slices'),
	(4, 26, 3, 'slices'),
	(4, 27, 15, 'ml'),
	(4, 28, 10, 'ml'),
	(4, 6, 2, 'grams'),
	(4, 13, 1, 'grams'),

	(5, 29, 2, 'pcs'),
	(5, 6, 0.25, 'tsp'),
	(5, 8, 1, 'tbsp'),
	(5, 30, 2, 'tbsp'),
	(5, 31, 4, 'pcs'),
	(5, 32, 2, 'tbsp'),

	(6, 33, 2, 'cups'),
	(6, 34, 2, 'cups'),
	(6, 35, 4, 'tbsp'),
	(6, 13, 1, 'tsp'),
	(6, 36, 1, 'cups'),
	(6, 37, 4, 'pcs');

INSERT INTO Pantry ([User_id], Ingredient_id, Quantity, Measurement)
VALUES
	(1, 1, 10, 'pcs'),
	(1, 2, 100, 'ml'),
	(1, 3, 250, 'ml'),
	(1, 4, 1000, 'g'),
	(1, 5, 500, 'g'),
	(1, 6, 100, 'g'),
	(1, 7, 400, 'g'),
	(1, 8, 4, 'cups'),
	(1, 9, 3, 'pcs'),
	(1, 10, 4, 'pcs'),
	(1, 36, 750, 'g'),
	(1, 37, 5, 'pcs');