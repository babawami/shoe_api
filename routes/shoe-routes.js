const ShoeServices = require('../services/shoes-services');

module.exports = function (ShoeServices) {
    let show = async (req, res, next) => {
        try {
            let results = await ShoeServices.showAll();
            res.render('/', {
                no_shoes: results.length === 0,
                shoesData: results
            });
        } catch (err) {
            next(err);
        }
    };
    return {
        show
    };
};
