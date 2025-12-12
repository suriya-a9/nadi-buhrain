const MaterialRequest = require('./materialRequest.model');
const Inventory = require("../inventory/inventory.model");

exports.singleRequest = async (req, res, next) => {
    const { productId, quantity, notes } = req.body;
    try {
        if (!req.user.id) {
            return res.status(400).json({
                message: "user id needed"
            });
        }
        const product = await Inventory.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "no such product"
            });
        }
        const availableQty = parseInt(product.quantity, 10);
        const requestedQty = parseInt(quantity, 10);
        if (isNaN(availableQty) || isNaN(requestedQty)) {
            return res.status(400).json({
                message: "Invalid quantity value"
            });
        }
        if (requestedQty > availableQty) {
            return res.status(400).json({
                message: "Not enough stocks"
            });
        }
        await MaterialRequest.create({
            technicianId: req.user.id,
            productId: product._id,
            quantity,
            notes
        });
        res.status(201).json({
            message: "Material request created successfully"
        });
    } catch (err) {
        next(err);
    }
}

exports.bulkRequest = async (req, res, next) => {
    try {
        const { requests } = req.body;

        if (!req.user.id) {
            return res.status(400).json({ message: "user id needed" });
        }

        if (!Array.isArray(requests) || requests.length === 0) {
            return res.status(400).json({ message: "No requests provided" });
        }

        for (const reqItem of requests) {
            const { productId, quantity } = reqItem;

            const product = await Inventory.findById(productId);
            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${productId}`
                });
            }

            const availableQty = parseInt(product.quantity, 10);
            const requestedQty = parseInt(quantity, 10);

            if (isNaN(availableQty) || isNaN(requestedQty)) {
                return res.status(400).json({
                    message: `Invalid quantity for product: ${productId}`
                });
            }

            if (requestedQty > availableQty) {
                return res.status(400).json({
                    message: `Requested quantity exceeds stock for product: ${productId}`
                });
            }
        }

        const bulkData = requests.map(item => ({
            technicianId: req.user.id,
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes || ""
        }));

        await MaterialRequest.insertMany(bulkData);

        res.status(201).json({
            message: "Bulk material requests submitted successfully",
            totalRequests: requests.length
        });

    } catch (err) {
        next(err);
    }
};

exports.responseMaterialRequest = async (req, res, next) => {

}