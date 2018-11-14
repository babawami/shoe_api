'use strict';
let assert = require('assert');
let ShoeServices = require('../services/shoes-services');
const pg = require('pg');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoes_db_tests';

const pool = new Pool({
    connectionString
});

const addShoesSQL = `
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (10,650,1,1,1);
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (5,500,2,2,2);
INSERT INTO inventory(qty,price, brands_id,colours_id,sizes_id) VALUES (20,800,3,3,3);
`;

describe('Shoe catalogue', function () {
    beforeEach(async function () {
        await pool.query('DELETE FROM inventory');
    });

    it('Return all the shoes ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.showAll();
        assert.equal(3, result.length);
    });
    it('Return brand selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getBrand('nike');
        delete result[0].id;
        assert.deepEqual([ { qty: 20, price: 800, brand: 'nike', colour: 'white', size: 10 } ], result);
    });
    it('Return shoes by size selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getSize(8);
        delete result[0].id;
        assert.deepEqual([ { qty: 5, price: 500, brand: 'puma', colour: 'red', size: 8 } ], result);
    });
    it('Return shoes by colour selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getColour('black');
        delete result[0].id;
        assert.deepEqual([ { qty: 10, price: 650, brand: 'adidas', colour: 'black', size: 5 } ], result);
    });
    it('Return shoes by brand and size selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getBrandSize('adidas', 5);
        delete result[0].id;
        assert.deepEqual([ { qty: 10, price: 650, brand: 'adidas', colour: 'black', size: 5 } ], result);
    });
    it('Return shoes by brand and colour selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getBrandColour('nike', 'white');
        delete result[0].id;
        assert.deepEqual([ { qty: 20, price: 800, brand: 'nike', colour: 'white', size: 10 } ], result);
    });
    it('Return shoes by  colour and size selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getColourSize('white', 10);
        delete result[0].id;
        assert.deepEqual([ { qty: 20, price: 800, brand: 'nike', colour: 'white', size: 10 } ], result);
    });
    it('Return shoes by  colour ,size and brand selected ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.getBrandColourSize('nike', 'white', 10);
        delete result[0].id;
        assert.deepEqual([ { qty: 20, price: 800, brand: 'nike', colour: 'white', size: 10 } ], result);
    });
    it('Return ids from brand , colour, size ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let specs = { brand: 'puma', colour: 'green', size: 13, price: 500, qty: 10 };
        let result = await shoes.getIds(specs);
        assert.deepEqual({ brands_id: 2, colours_id: 4, sizes_id: 4 }, result);
    });
    // it('Return message "updated" if it\'s existing shoe', async () => {
    //     await pool.query(addShoesSQL);
    //     let shoes = ShoeServices(pool);
    //     let specs = { brand: 'nike', colour: 'white', size: 10, price: 800, qty: 30 };
    //     let result = await shoes.addShoe(specs);
    //     assert.deepEqual('updated', result);
    // });
    // it('Return message "shoe added" if it\'s new shoe', async () => {
    //     await pool.query(addShoesSQL);
    //     let shoes = ShoeServices(pool);
    //     let specs = { brand: 'nike', colour: 'white', size: 10, price: 800, qty: 30 };
    //     let result = await shoes.addShoe(specs);
    //     assert.deepEqual('updated', result);
    // });
    after(function () {
        pool.end();
    });
});
