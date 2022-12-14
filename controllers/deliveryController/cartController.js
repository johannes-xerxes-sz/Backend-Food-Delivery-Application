const Cart = require("../models/delivery/Cart");

const postCart = async (req, res, next) => {
    try {
        const cart= await Cart.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(cart)
    }
    catch (err)
    {
        throw new Error(`Error deleting Payment: ${err.message}`);
    }
}



module.exports = {
    postCart
}