
module.exports = function (shoeServices) {
    const all = async (req, res, next) => {
        try {
            let results = await shoeServices.showAll();
            res.json({
                status: 'success',
                data: results
            });
        } catch (err) {
            next(err);
        }
    };
    return {
        all
    };
};
