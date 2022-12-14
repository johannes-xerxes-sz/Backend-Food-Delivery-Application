const Cart = require("../models/delivery/Cart");

const getCarts = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            cartName,
            gender
        } = req.query

        if (cartName) filter.cartName = true;
        if (gender) filter.gender = true;

        if (limit) options.limit = limit;
        if (sortByAge) {
            options.sort = {
              age: sortByAge === 'asc' ? 1 : -1
            };
          }
    }

    try { 
        const carts = await Cart.find( filter, options, {} );
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(carts)
    }
    catch (err) {
        throw new Error(`Error retrieving cart: ${err.message}`);
    }


}

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

const deleteCarts = async (req, res, next) => {
    try {
    await Cart.deleteMany();
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg:'Deleted all cart'})
        }
    catch (err) {
        throw new Error(`Error retrieving cart:${err.message}`)
                }
            }


//! For /:CartID endpoint: 

const getCart = async (req, res, next) => {
    
    
    try {
        const cart = await Cart.findById(req.params.cartId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(cart) 
    }
    catch (err) {
        throw new Error(`Error retrieving cart with ID of: ${req.params.cartId} ${err.message}`)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cartId, {
            $set: req.body
        }, { new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(cart) 
    }
    catch (err) {}
        throw new Error(`Error updating cart with ID of: ${req.params.cartId} ${err.message}`)
    }

const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.cartId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `Delete the cart with id: ${req.params.cartId}`}) 
    }
    catch (err) {
        throw new Error(`Error deleting cart with ID of: ${req.params.cartId} ${err.message}`)
    }
}

module.exports = {
    postCart,
    getCarts,
    deleteCarts,
    getCart,
    updateCart,
    deleteCart
}