const Delivery = require("../models/delivery/Delivery");

const getDeliveries = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            deliveryName,
            gender
        } = req.query

        if (deliveryName) filter.deliveryName = true;
        if (gender) filter.gender = true;

        if (limit) options.limit = limit;
        if (sortByAge) {
            options.sort = {
              age: sortByAge === 'asc' ? 1 : -1
            };
          }
    }

    try { 
        const delivery = await Delivery.find( filter, options, {} );
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(delivery)
    }
    catch (err) {
        throw new Error(`Error retrieving delivery: ${err.message}`);
    }


}

const postDelivery = async (req, res, next) => {
    try {
        const delivery= await Delivery.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(delivery)
    }
    catch (err)
    {
        throw new Error(`Error deleting Payment: ${err.message}`);
    }
}

const deleteDeliveries = async (req, res, next) => {
    try {
    await Delivery.deleteMany();
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg:'Deleted all delivery'})
        }
    catch (err) {
        throw new Error(`Error retrieving delivery:${err.message}`)
                }
            }


//! For /:DeliveryID endpoint: 

const getDelivery = async (req, res, next) => {
    
    
    try {
        const delivery = await Delivery.findById(req.params.deliveryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(delivery) 
    }
    catch (err) {
        throw new Error(`Error retrieving delivery with ID of: ${req.params.deliveryId} ${err.message}`)
    }
}

const updateDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.findByIdAndUpdate(req.params.deliveryId, {
            $set: req.body
        }, { new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(delivery) 
    }
    catch (err) {}
        throw new Error(`Error updating delivery with ID of: ${req.params.deliveryId} ${err.message}`)
    }

const deleteDelivery = async (req, res, next) => {
    try {
        await Delivery.findByIdAndDelete(req.params.deliveryId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `Delete the delivery with id: ${req.params.deliveryId}`}) 
    }
    catch (err) {
        throw new Error(`Error deleting delivery with ID of: ${req.params.deliveryId} ${err.message}`)
    }
}

module.exports = {
    postDelivery,
    getDeliveries,
    deleteDeliveries,
    getDelivery,
    updateDelivery,
    deleteDelivery
}