DROP TABLE IF EXISTS brands, colours, sizes, inventory;

CREATE TABLE brands
(
    id serial PRIMARY KEY NOT NULL,
    brand text NOT NULL
);

CREATE TABLE colours
(
    id serial PRIMARY KEY NOT NULL,
    colour text NOT NULL
);

CREATE TABLE sizes
(
    id serial PRIMARY KEY NOT NULL,
    size int NOT NULL
);

CREATE TABLE inventory
(
    id serial PRIMARY KEY NOT NULL,
    qty int NOT NULL,
    price int NOT NULL,
    brands_id int NOT NULL ,
    colours_id int NOT NULL,
    sizes_id int NOT NULL,
    FOREIGN key (brands_id) REFERENCES brands(id) ON DELETE CASCADE,
    FOREIGN key (colours_id) REFERENCES colours(id) ON DELETE CASCADE,
    FOREIGN KEY (sizes_id) REFERENCES sizes(id) ON DELETE CASCADE
);
-- INSERT brands into brands DATABASE
INSERT INTO brands(brand) VALUES ('adidas');
INSERT INTO brands(brand) VALUES ('puma');
INSERT INTO brands(brand) VALUES ('nike');

-- insert colours into colours DATABASE
INSERT INTO colours(colour) VALUES ('black');
INSERT INTO colours(colour) VALUES ('red');
INSERT INTO colours(colour) VALUES ('white');

-- insert sizes into sizes DATABASE
 INSERT INTO sizes(size) VALUES (5);
 INSERT INTO sizes(size) VALUES (8);
 INSERT INTO sizes(size) VALUES (10);

--  insert default shoes into the inventory database
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (10,650,1,1,1);
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (5,500,2,2,2);
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (20,800,3,3,3);

