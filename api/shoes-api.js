
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

    const getColourSelected = async (req, res) => {
        try {
            let colour = req.params.colour;
            let getColours = await shoeServices.getColour(colour);
            res.json({
                status: 'success',
                data: getColours
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };

    const getBrandSizeSelected = async (req, res) => {
        try {
            let brand = req.params.brandname;
            let size = req.params.size;
            let getBrandSize = await shoeServices.getBrandSize(brand, size);
            res.json({
                status: 'success',
                data: getBrandSize
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };

    const getBrandColourSelected = async (req, res) => {
        try {
            let brand = req.params.brandname;
            let colour = req.params.colour;
            let getBrandColour = await shoeServices.getBrandColour(brand, colour);
            res.json({
                status: 'success',
                data: getBrandColour
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };

    const getColourSizeSelected = async (req, res) => {
        try {
            let size = req.params.size;
            let colour = req.params.colour;
            let getColourSize = await shoeServices.getColourSize(colour, size);
            res.json({
                status: 'success',
                data: getColourSize
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    };

    const getBrandColourSize = async (req, res) => {
        try {
            let brand = req.params.brandname;
            let size = req.params.size;
            let colour = req.params.colour;
            let getBrandcolourSize = await shoeServices.getBrandColourSize(brand, colour, size);
            res.json({
                status: 'success',
                data: getBrandcolourSize
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
        getSizeSelected,
        getColourSelected,
        getBrandSizeSelected,
        getBrandColourSelected,
        getColourSizeSelected,
        getBrandColourSize
    };
};
