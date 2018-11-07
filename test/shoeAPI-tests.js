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
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (10,650,1,1,1);
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (5,500,2,2,2);
INSERT INTO inventory(qty,price, brands_id,colours_id,size_id) VALUES (20,800,3,3,3);
`;

describe('Shoe catalogue', function () {
    beforeEach(async function () {
        await pool.query('DELETE FROM inventory');
    });

    it('Return all the shoes ', async () => {
        await pool.query(addShoesSQL);
        let shoes = ShoeServices(pool);
        let result = await shoes.showAll();
        console.log(await shoes.getBrand());
        assert.equal(3, result.length);
    });
    after(function () {
        pool.end();
    });
});
