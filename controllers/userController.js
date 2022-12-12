const User = require("../models/User");

const getUsers = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            userName,
            gender,
            email,
            password,
            firstName,
            lastName,
            limit,
            age,
            sortByAge
        } = req.query

        if (userName) filter.userName = true;
        if (gender) filter.gender = true;
        if (email) filter.email = true;
        if (password) filter.password = true;
        if (firstName) filter.firstName = true;
        if (lastName) filter.lastName = true;
        if (age) filter.age = true;

        if (limit) options.limit = limit;
        if (sortByAge) options.sort = {
            age: sortByAge === 'asc' ? 1 : -1
        }
    }

    try { 
        const users = await User.find({}, filter, options );
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(users)
    }
    catch (err) {
        throw new Error(`Error retrieving User: ${err.message}`);
    }


}

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    }
    catch (err)
    {
        throw new Error(`Error deleting Users: ${err.message}`);
    }
}

const deleteUsers = async (req, res, next) => {
    try {
    await User.deleteMany();
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg:'Deleted all User'})
        }
    catch (err) {
        throw new Error(`Error retrieving User:${err.message}`)
                }
            }


//! For /:UserID endpoint: 

const getUser = async (req, res, next) => {
    
    
    try {
        const user = await User.findById(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user) 
    }
    catch (err) {
        throw new Error(`Error retrieving User with ID of: ${req.params.userId} ${err.message}`)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user) 
    }
    catch (err) {}
        throw new Error(`Error updating User with ID of: ${req.params.userId} ${err.message}`)
    }

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.UserId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `Delete the User with id: ${req.params.userId}`}) 
    }
    catch (err) {
        throw new Error(`Error deleting User with ID of: ${req.params.userId} ${err.message}`)
    }
}

module.exports = {
    
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser

}