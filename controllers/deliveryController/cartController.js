const Cart = require("../../models/delivery/Cart");

//! for /payment endpoint

const getPayments = async (req, res, next) => {

  try {
    const cart = await Cart.findById(req.params.cartId) 
    const foods = cart.foods;
    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(foods);
  } catch (err) {
    throw new Error(`Error retrieving all payments: ${err.message}`);
  }
};

const postPayment = async (req, res, next) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  try {
  const payment = await stripe.charges.create(req.body);
  const {
      amount,
      currency,
      source,
      description,
  }= payment

  const charge = await Cart.create({
      amount,
      currency,
      source: source.brand,
      description,
  });
      res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .json(charge)
  }
  catch (err)
  {
      throw new Error(`Error deleting Payment: ${err.message}`);
  }
}


const getCarts = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            address,
            author
        } = req.query

        if (address) filter.address = true;
        if (author) filter.author = true;

        if (limit) options.limit = limit;
        // if (sortByAge) {
        //     options.sort = {
        //       age: sortByAge === 'asc' ? 1 : -1
        //     };
        //   }
    }

    try { 
        const carts = await Cart.find( filter, options, {} )
        .populate([
            {
              path: 'author',
              select: ['userName','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            }
          ]);
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
        const cart= await (await Cart.create(req.body))
        .populate([
            {
              path: 'author',
              select: ['userName','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            }
          ]);

        
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(cart)
    }
    catch (err)
    {
        throw new Error(`Error posting cart: ${err.message}`);
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
        const cart = await Cart.findById(req.params.cartId)
        .populate([
            {
              path: 'author',
              select: ['userName','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            }
          ]);

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
        }, { new: true})
        .populate([
            {
              path: 'author',
              select: ['userName','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            }
          ]);
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

//! For '/:CartId/cart/:cartId' startpoint

const getCartFood = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId)
        const food = cart.foods.find(food => (food._id).equals(req.params.foodId))
        console.log('CART foods',cart.foods._id)

        if(!food) {food = {success:false, msg: `No food found with food id: ${req.params.foodId}`}}

        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(food)

    } catch (err) {
        throw new Error (`Error retrieving food with id: ${req.params.foodId}, ${err.message}`)
    }
}

const updateCartFood = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId)        
        .populate([
            {
              path: 'author',
              select: ['userName','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            }
          ]);
        let food = cart.foods.find(food => (food._id).equals(req.params.foodId))

        if(food) {
            const foodIndexPosition = cart.foods.indexOf(food)
            cart.foods.splice(foodIndexPosition, 1, req.body);
            food = cart.foods[foodIndexPosition]
            await cart.save();
        }
        else {
            food = {success: false, msg: `No food found with the id: ${req.params.foodId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(food);
    }
    catch (err) {
        throw new Error (`Error updating cart with Id: ${req.params.foodId}:${err.message}`)
    }
}

const deleteCartFood = async (req, res, next) => {
    try {
    let cart = await Cart.findById(req.params.cartId);
    let food = cart.foods.find(food => (food._id).equals(req.params.foodId));
        if (food) {
            const foodIndexPosition = cart.foods.indexOf(food);
            cart.foods.splice(foodIndexPosition, 1);
            food = {success: true, msg: `food with Id: ${req.params.foodId} deleted`}
            await cart.save();

        }
        else {
            food = {success: false, msg: `No food found with the id: ${req.params.foodId}`}
        }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(food)

    }
    catch (err) {
        throw new Error (`Error deleting food with Id: ${req.params.foodId} : ${err.message}`)
    }
}
//! For '/:cartId/foods/:foodId' endpoint
//! For '/:cartId/foods' startpoint

const getCartFoods = async (req, res, next) => {
    try {
      const cart = await Cart.findById(req.params.cartId)        
      .populate(
        {
            path: 'foods.menu',
            select: 'name restaurant type price'
        }
      )
      const foods = cart.foods;
      res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(foods);
    } catch (err) {
      throw new Error(`Error retrieving all foods: ${err.message}`);
    }
  };
  
  

  const postCartFood = async (req, res, next) => {
    try {
      const cart = await Cart.findById(req.params.cartId).populate('foods.menu');
  
      cart.foods.push(req.body);
      const result = await cart.save();
        // console.log(`req.body details`,req.body)
        // console.log(`cart details`,cart)

      // Include the price field in the response
    //   const price = result.foods[result.foods.length - 1].menu.price;
    //   res.price = price;
    //   console.log(price)

      res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result);
    } catch (err) {
      throw new Error(`Error posting a cart food: ${err.message}`);
    }
  };
  
  
  

const deleteCartFoods = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        cart.foods = [];
        await cart.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all foods`})
    }
    catch (err) {
        throw new Error(`Error deleting all foods: ${err.message}`)
    }
}

//! For '/:cartId/foods' endpoint
//! For '/:cartId/quantity' endpoint

// const getCartQuantity = async (req, res, next) => {
//     try {
//         const cart = await Cart.findById(req.params.cartId)
//         const quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId))
//         if(!quantity) {quantity = {success:false, msg: `No quantity found with quantity id: ${req.params.quantityId}`}}
//         res
//         .set(200)
//         .setHeader('Content-Type', 'application/json')
//         .json(quantity)

//     } catch (err) {
//         throw new Error (`Error retrieving quantity with id: ${req.params.quantityId}, ${err.message}`)
//     }
// }

// const updateCartQuantity = async (req, res, next) => {
//     try {
//         const cart = await Cart.findById(req.params.cartId);
//         let quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId))

//         if(quantity) {
//             const quantityIndexPosition = cart.foods.quantity.indexOf(quantity)
//             cart.foods.quantity.splice(quantityIndexPosition, 1, req.body);
//             quantity = cart.foods.quantity[foodIndexPosition]
//             await cart.save();
//         }
//         else {
//             quantity = {success: false, msg: `No quantity found with the id: ${req.params.quantityId}`}
//         }

//         res
//         .status(200)
//         .setHeader('Content-Type', 'application/json')
//         .json(quantity);
//     }
//     catch (err) {
//         throw new Error (`Error updating cart with Id: ${req.params.quantityId}:${err.message}`)
//     }
// }

// const deleteCartQuantity = async (req, res, next) => {
//     try {
//     let cart = await Cart.findById(req.params.cartId);
//     let quantity = cart.foods.quantity.find(quantity => (quantity._id).equals(req.params.quantityId));
//         if (quantity) {
//             const foodIndexPosition = cart.foods.quantity.indexOf(quantity);
//             cart.foods.quantity.splice(foodIndexPosition, 1);
//             quantity = {success: true, msg: `quantity with Id: ${req.params.quantityId} deleted`}
//             await cart.save();

//         }
//         else {
//             quantity = {success: false, msg: `No quantity found with the id: ${req.params.quantityId}`}
//         }

//     res
//     .status(200)
//     .setHeader('Content-Type', 'application/json')
//     .json(quantity)

//     }
//     catch (err) {
//         throw new Error (`Error deleting quantity with Id: ${req.params.quantityId} : ${err.message}`)
//     }
// }
// //! For '/:cartId/quantity/:quantityId' end point 

// const getCartQuantitys = async (req, res, next) => {
//     try {
//         const cart = await Cart.findById(req.params.cartId);
//         const foods = cart.foods.quantity;

//         res
//         .status(200)
//         .setHeader('Content-Type', 'application/json')
//         .json(foods)

//     }
//     catch (err) {
//         throw new Error (`Error retrieving all foods: ${err.message}`)
//     }
// }

// const postCartQuantity = async (req, res, next) => {
//     try {
//         const cart = await Cart.findById(req.params.cartId);
//         cart.foods.quantity.push(req.body);
        
//         const result = await cart.save();
//         res
//         .status(201) //need_clarify
//         .setHeader('Content-Type', 'application/json')
//         .json(result)
//     }
//     catch (err) {
//         throw new Error(`Error posting a cart quantity: ${err.message}`)
//     }
// }

// const deleteCartQuantitys = async (req, res, next) => {
//     try {
//         const cart = await Cart.findById(req.params.cartId);
//         cart.foods.quantity = [];
//         await cart.save();

//         res
//         .status(200)
//         .setHeader('Content-Type', 'application/json')
//         .json({ success: true, msg: `deleted all foods`})
//     }
//     catch (err) {
//         throw new Error(`Error deleting all quantity: ${err.message}`)
//     }
// }


module.exports = {
    postCart,
    getCarts,
    deleteCarts,
    getCart,
    updateCart,
    deleteCart,
    getCartFood,
    updateCartFood,
    deleteCartFood,
    getCartFoods,
    postCartFood,
    deleteCartFoods,

    getPayments,
    postPayment
    
    // getCartQuantity,
    // updateCartQuantity,
    // deleteCartQuantity,
    // getCartQuantitys,
    // postCartQuantity,
    // deleteCartQuantitys
}