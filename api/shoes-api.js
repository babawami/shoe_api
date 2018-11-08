
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

    const getBrandSelected = async (req, res) => {
        try {
            let brand = req.params.brandname;
            let showBrand = await shoeServices.getBrand(brand);
            res.json({
                status: 'success',
                data: showBrand
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };

    const getSizeSelected = async (req, res) => {
        try {
            let size = req.params.size;
            let getSizes = await shoeServices.getSize(size);
            res.json({
                status: 'success',
                data: getSizes
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };
    return {
        all,
        getBrandSelected,
        getSizeSelected
    };
};
