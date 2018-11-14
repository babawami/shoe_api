module.exports = function ShoeServices (pool) {
    let showAll = async () => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id`;
        let results = await pool.query(query);
        return results.rows;
    };

    let getBrand = async (brand) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE brands.brand = $1`;
        let results = await pool.query(query, [brand]);
        return results.rows;
    };

    let getSize = async (size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE sizes.size  = $1`;
        let results = await pool.query(query, [size]);
        return results.rows;
    };

    let getColour = async (colour) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE colours.colour  = $1`;
        let results = await pool.query(query, [colour]);
        return results.rows;
    };

    let getBrandSize = async (brand, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
    FROM brands
    JOIN inventory
    ON inventory.brands_id =brands.id 
    JOIN colours
    ON colours.id = inventory.colours_id
    JOIN sizes
    ON  sizes.id = inventory.sizes_id
    WHERE brands.brand = $1 AND sizes.size  = $2 `;
        let results = await pool.query(query, [brand, size]);
        return results.rows;
    };
    let getBrandColour = async (brand, colour) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE brands.brand = $1 AND colours.colour = $2 `;
        let results = await pool.query(query, [brand, colour]);
        return results.rows;
    };
    let getColourSize = async (colour, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE colours.colour = $1 AND sizes.size = $2 `;
        let results = await pool.query(query, [colour, size]);
        return results.rows;
    };
    let getBrandColourSize = async (brand, colour, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brand , colours.colour , sizes.size
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN sizes
        ON  sizes.id = inventory.sizes_id
        WHERE brands.brand = $1 AND colours.colour = $2 AND sizes.size = $3 `;
        let results = await pool.query(query, [brand, colour, size]);
        return results.rows;
    };

    let getIds = async (specs) => {
        // console.log(specs);
        let ids = {};
        let keys = Object.keys(specs).slice(0, 3);
        // expecting keys = [brand,color,size]
        for (let i = 0; i < keys.length; i++) {
            // console.log(keys[i]);
            const query = `SELECT id FROM ${keys[i]}s WHERE ${keys[i]} = $1`;
            let result = await pool.query(query, [specs[keys[i]]]);
            if (result.rowCount === 0) {
                let sql = `INSERT INTO ${keys[i]}s (${keys[i]}) VALUES($1) returning id;`;
                let sqlResult = await pool.query(sql, [specs[keys[i]]]);
                ids[`${keys[i]}s_id`] = sqlResult.rows[0].id;
                // console.log(ids);
            }
            if (result.rowCount === 1) {
                let queryResult = await pool.query(query, [specs[keys[i]]]);
                ids[`${keys[i]}s_id`] = queryResult.rows[0].id;
            }
        }
        return ids;
    };

    let addShoe = async (shoe) => {
        // should provide id for colour,brand and shoe
        let getIDs = await getIds(shoe);
        let brandsID = getIDs.brands_id;
        let coloursID = getIDs.colours_id;
        let sizesID = getIDs.sizes_id;
        
        let findShoe = `SELECT 1  FROM inventory
                     WHERE brands_id = $1 AND colours_id = $2 AND sizes_id = $3`;
        let shoeResult = await pool.query(findShoe, [brandsID, coloursID, sizesID]);
        // console.log(shoeResult.rows.length);
        if (shoeResult.rows.length === 1) {
            let updateQuery = `UPDATE inventory
                SET qty = qty + $1,
                    price =  $2
                    WHERE brands_id = $3 AND colours_id = $4 AND sizes_id = $5`;
            await pool.query(updateQuery, [shoe.qty, shoe.price, brandsID, coloursID, sizesID]);
            return 'updated';
        }
        if (shoeResult.rows.length === 0) {
            await pool.query('insert into inventory(brands_id,colours_id,sizes_id,price,qty) values($1,$2,$3,$4,$5)', [brandsID, coloursID, sizesID, shoe.price, shoe.qty]);
            return 'shoe added';
        }
        // let result = await pool.query('SELECT * FROM inventory');
        // console.log('-----------');
        // console.log(result.rows);
        // console.log('-----------');
    };

    return {
        showAll,
        getBrand,
        getSize,
        getColour,
        getBrandSize,
        getBrandColour,
        getColourSize,
        getBrandColourSize,
        getIds,
        addShoe

    };
};
