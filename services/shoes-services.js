module.exports = function ShoeServices (pool) {
    let showAll = async () => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id`;
        let results = await pool.query(query);
        return results.rows;
    };

    let getBrand = async (brand) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE brands.brands_name = $1`;
        let results = await pool.query(query, [brand]);
        return results.rows;
    };

    let getSize = async (size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE size.shoes_size  = $1`;
        let results = await pool.query(query, [size]);
        return results.rows;
    };

    let getColour = async (colour) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE colours.shoes_colour  = $1`;
        let results = await pool.query(query, [colour]);
        return results.rows;
    };

    let getBrandSize = async (brand, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
    FROM brands
    JOIN inventory
    ON inventory.brands_id =brands.id 
    JOIN colours
    ON colours.id = inventory.colours_id
    JOIN size
    ON  size.id = inventory.size_id
    WHERE brands.brands_name = $1 AND size.shoes_size  = $2 `;
        let results = await pool.query(query, [brand, size]);
        return results.rows;
    };
    let getBrandColour = async (brand, colour) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE brands.brands_name = $1 AND colours.shoes_colour = $2 `;
        let results = await pool.query(query, [brand, colour]);
        return results.rows;
    };
    let getColourSize = async (colour, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE colours.shoes_colour = $1 AND size.shoes_size = $2 `;
        let results = await pool.query(query, [colour, size]);
        return results.rows;
    };
    let getBrandColourSize = async (brand, colour, size) => {
        const query = `SELECT inventory.id,inventory.qty,inventory.price, brands.brands_name AS brands, colours.shoes_colour AS colours, size.shoes_size AS size 
        FROM brands
        JOIN inventory
        ON inventory.brands_id =brands.id 
        JOIN colours
        ON colours.id = inventory.colours_id
        JOIN size
        ON  size.id = inventory.size_id
        WHERE brands.brands_name = $1 AND colours.shoes_colour = $2 AND size.shoes_size = $3 `;
        let results = await pool.query(query, [brand, colour, size]);
        return results.rows;
    };

    let addShoe = async (shoe) => {
        let data = {
            brand: shoe.brand_id,
            colour: shoe.colour_id,
            size: shoe.size_id,
            price: shoe.prize,
            qty: shoe.qty
        };
        let BrandID = await pool.query('SELECT id FROM brands WHERE ');
    };

    // let updateShoe = async (shoe) => {
    //     let data = {
    //         brand: shoe.brand_id,
    //         coulr: shoe.colour_id,
    //         size: shoe.size_id,
    //         price: shoe.prize,
    //         qty: shoe.qty

    //     };
    // };

    return {
        showAll,
        getBrand,
        getSize,
        getColour,
        getBrandSize,
        getBrandColour,
        getColourSize,
        getBrandColourSize

    };
};
