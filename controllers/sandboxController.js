//! For '/:CartId/cart/:cartId/:quantityId' endpoint

const getCartFoodQuantity = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId)
        const quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId))
        if(!quantity) {quantity = {success:false, msg: `No quantity found with quantity id: ${req.params.quantityId}`}}
        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(quantity)

    } catch (err) {
        throw new Error (`Error retrieving quantity with id: ${req.params.quantityId}, ${err.message}`)
    }
}

const updateCartFoodQuantity = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        let quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId))

        if(quantity) {
            const quantityIndexPosition = cart.foods.quantity.indexOf(quantity)
            cart.foods.quantity.splice(quantityIndexPosition, 1, req.body);
            quantity = cart.foods.quantity[foodIndexPosition]
            await cart.save();
        }
        else {
            quantity = {success: false, msg: `No quantity found with the id: ${req.params.quantityId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(quantity);
    }
    catch (err) {
        throw new Error (`Error updating cart with Id: ${req.params.quantityId}:${err.message}`)
    }
}

const deleteCartFoodQuantity = async (req, res, next) => {
    try {
    let cart = await Cart.findById(req.params.cartId);
    let quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId));
        if (quantity) {
            const foodIndexPosition = cart.foods.quantity.indexOf(quantity);
            cart.foods.quantity.splice(foodIndexPosition, 1);
            quantity = {success: true, msg: `quantity with Id: ${req.params.quantityId} deleted`}
            await cart.save();

        }
        else {
            quantity = {success: false, msg: `No quantity found with the id: ${req.params.quantityId}`}
        }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(quantity)

    }
    catch (err) {
        throw new Error (`Error deleting quantity with Id: ${req.params.quantityId} : ${err.message}`)
    }
}
//! For '/:cartId/foods' end point 

const getCartFoodQuantitys = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        const foods = cart.foods.quantity;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(foods)

    }
    catch (err) {
        throw new Error (`Error retrieving all foods: ${err.message}`)
    }
}

const postCartFoodQuantity = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        cart.foods.quantity.push(req.body);
        
        const result = await cart.save();
        res
        .status(201) //need_clarify
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error posting a cart quantity: ${err.message}`)
    }
}

const deleteCartFoodQuantitys = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        cart.foods.quantity = [];
        await cart.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all foods`})
    }
    catch (err) {
        throw new Error(`Error deleting all quantity: ${err.message}`)
    }
}

