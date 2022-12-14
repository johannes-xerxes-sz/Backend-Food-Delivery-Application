const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    logout,
    updatePassword
 
} = require('../controllers/userController');
const protectedRoute = require('../middlewares/auth')
const reqRecievedLogger  = require('../middlewares/reqRecievedLogger')
const {userValidator} = require('../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, protectedRoute, getUsers) 
    .post(reqRecievedLogger, userValidator, postUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUsers)

    //login - logout
 
    router.route('/login')
    .post(reqRecievedLogger, login)
 
    router.route('/forgotpassword')
    .post(reqRecievedLogger, forgotPassword)

router.route('/resetpassword')
    .put(reqRecievedLogger, resetPassword)

router.route('/updatepassword')
    .put(reqRecievedLogger, protectedRoute, updatePassword)

router.route('/logout')
    .get(reqRecievedLogger, protectedRoute, logout)

 
    router.route('/:userId')
    .get(reqRecievedLogger, getUser)
    .put(reqRecievedLogger, protectedRoute, updateUser)
    .delete(reqRecievedLogger, protectedRoute, deleteUser)

    module.exports = router;