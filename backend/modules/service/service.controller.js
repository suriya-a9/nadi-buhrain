const Service = require('./service.model');

exports.createService = async (req, res, next) => {
    const { name } = req.body;
    try {
        await Service.create({
            name
        });
        res.status(201).json({
            message: 'Service created'
        })
    } catch (err) {
        next(err);
    }
}