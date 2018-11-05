DROP TABLE IF EXISTS brands, colours, size, inventory 

CREATE TABLE brands
(
    id serial PRIMARY KEY NOT NULL,
    brands_name text NOT NULL
);

CREATE TABLE colours
(
    id serial PRIMARY KEY NOT NULL,
    shoes_colour text NOT NULL
);

CREATE TABLE size
(
    id serial PRIMARY KEY NOT NULL,
    shoes_size int NOT NULL
);

CREATE TABLE inventory
(
    id serial PRIMARY KEY NOT NULL,
    qty int NOT NULL,
    price int NOT NULL,
    brands_id int NOT NULL ,
    colours_id int NOT NULL,
    size_id int NOT NULL,


    FOREIGN key (brands_id) REFERENCES brands(id) ON DELETE CASCADE,
    FOREIGN key (colours_id) REFERENCES colours(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES size(id) ON DELETE CASCADE

select inventory.id,brans_id,colours_id,size_id
select inventory.id,brans_id,colours_id,size_id
-- INSERT brands into brands DATABASE
INSERT INTO brands(brands_name) VALUES ('adidas');
INSERT INTO brands(brands_name) VALUES ('puma');
INSERT INTO brands(brands_name) VALUES ('nike');

-- insert colours into colours DATABASE
INSERT INTO colours(shoes_colour) VALUES ('black');
INSERT INTO colours(shoes_colour) VALUES ('red');
INSERT INTO colours(shoes_colour) VALUES ('white');

-- insert sizes into sizes DATABASE
 INSERT INTO size(shoes_size) VALUES (5);
 INSERT INTO size(shoes_size) VALUES (8);
 INSERT INTO size(shoes_size) VALUES (10);

--  insert default shoes into the inventory database
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (10,650,1,1,1);
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (5,500,2,2,2);
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (20,800,3,3,3);

