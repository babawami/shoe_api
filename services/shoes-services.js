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
    return {
        showAll
    };
};
