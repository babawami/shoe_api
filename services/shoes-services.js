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
        let result = await pool.query('SELECT * FROM inventory WHERE colours_is =$1', [colour]);
        return result.rows;
    };
    return {
        showAll,
        getBrand,
        getSize,
        getColour
    };
};
