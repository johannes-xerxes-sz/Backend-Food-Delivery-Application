const Delivery = require('../../models/delivery/Delivery');

const getDeliverys = async (req, res, next) => {

    const filter = {};
    const options = {};
    if(Object.keys(req.query).length){
        // query parameter
        const {
            cart,
            // user,
            // restaurant,
            sortByName
        } = req.query

        if(cart) filter.cart = true
        // if(user) filter.user = true
        // if(restaurant) filter.restaurant = true

        if(limit) options.limit = limit
        if (sortByName) {
            options.sort = {
              cart: sortByName === 'asc' ? 1 : -1
            };
          }
    }

    try {
        const deliverys = await Delivery.find({ }, filter, options)
        .populate([
            {
              path: 'cart',
              select: ['_id','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            },
            {
              path: 'user',
              select: ['userName', 'address','latitude','longitude']
            }
          ]);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deliverys)

    } catch (err) {
        throw new Error(`Error retrieving all delivery: ${err.message}`)
    }
    
}

const postDelivery = async (req, res, next) => {
    try {
        const delivery= await (await Delivery.create(req.body))
        .populate([
            {
              path: 'cart',
              select: ['_id','address','latitude','longitude']
            },
            {
              path: 'restaurant',
              select: ['name', 'address','latitude','longitude']
            },
            {
              path: 'user',
              select: ['userName', 'address','latitude','longitude']
            }
          ]);
        
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(delivery)
    }
    catch (err) {
        throw new Error(`Error retrieving delivery: ${err.message}`);
    }

}

const deleteDeliverys = async (req, res, next) => {
    try {
        await Delivery.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'deleted all delivery'})
    }
    catch (err) {
        throw new Error(`Error deleting deliverys: ${err.message}`);
    }
}


//! For deliveryId endpoint:  

const getDelivery = async (req, res, next) => {
    try {
        const result = await Delivery.findById(req.params.deliveryId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } 
    catch (err) {
        throw new Error (`Error retrieving delivery with ID of: ${req.params.deliveryId} ${err.message}`);
    }
}

const updateDelivery = async (req, res, next) => {
    try {
        const result = await Delivery.findByIdAndUpdate(req.params.deliveryId, {
            $set: req.body

        }, {new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error updating delivery with ID of: ${req.params.deliveryId} ${err.message}`);
    }
}


const deleteDelivery = async (req, res, next) => {
    try {
        await Delivery.findByIdAndDelete(req.params.deliveryId);
        res 
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete delivery with id: ${req.params.deliveryId}`})
    }
    catch (err) {
        throw new Error(`Error deleting delivery with ID of: ${req.params.deliveryId} ${err.message}`);
          }
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `Deleted  the delivery with id: ${req.params.deliveryId}`}) 
}

//! For '/:deliveryId/ratings/:ratingId' startpoint

const getDeliveryRating = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.deliveryId)
        const rating = delivery.ratings.find(rating => (rating._id).equals(req.params.ratingId))
        if(!rating) {rating = {success:false, msg: `No rating found with rating id: ${req.params.ratingId}`}}
        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error (`Error retrieving rating with id: ${req.params.ratingId}, ${err.message}`)
    }
}

const updateDeliveryRating = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.deliveryId);
        let rating = delivery.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if(rating) {
            const ratingIndexPosition = delivery.ratings.indexOf(rating)
            delivery.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = delivery.ratings[ratingIndexPosition]
            await delivery.save();
        }
        else {
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating);
    }
    catch (err) {
        throw new Error (`Error updating delivery with Id: ${req.params.ratingId}:${err.message}`)
    }
}

const deleteDeliveryRating = async (req, res, next) => {
    try {
    let delivery = await Delivery.findById(req.params.deliveryId);
    let rating = delivery.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        if (rating) {
            const ratingIndexPosition = delivery.ratings.indexOf(rating);
            delivery.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with Id: ${req.params.ratingId} deleted`}
            await delivery.save();

        }
        else {
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`}
        }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(rating)

    }
    catch (err) {
        throw new Error (`Error deleting rating with Id: ${req.params.ratingId} : ${err.message}`)
    }
}

//! For '/:deliveryId/ratings' startpoint

const getDeliveryRatings = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.deliveryId);
        const ratings = delivery.ratings;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    }
    catch (err) {
        throw new Error (`Error retrieving all ratings: ${err.message}`)
    }
}

const postDeliveryRating = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.deliveryId);
        delivery.ratings.push(req.body);
        
        const result = await delivery.save();
        res
        .status(201) //need_clarify
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error posting a delivery rating: ${err.message}`)
    }
}

const deleteDeliveryRatings = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.deliveryId);
        delivery.ratings = [];
        await delivery.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all ratings`})
    }
    catch (err) {
        throw new Error(`Error deleting all ratings: ${err.message}`)
    }
}

//! For '/:deliveryId/ratings' endpoint
//! For '/:deliveryId/ratings/:ratingId' endpoint

module.exports = {
    
    getDeliverys,
    postDelivery,
    deleteDeliverys,
    getDelivery,
    updateDelivery,
    deleteDelivery,

}