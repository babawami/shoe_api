// const ShoeServices = require('../services/shoes-services');

module.exports = function (shoeServices) {
    let all = async (req, res, next) => {
        try {
            let results = await shoeServices.showAll();
            res.render('/ace', {
                no_shoes: results.length === 0,
                shoesData: results
            });
        } catch (err) {
            next(err);
        }
    };
    return {
        all
    };
};
