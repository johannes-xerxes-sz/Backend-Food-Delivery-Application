const express = require('express');
const router = express.Router();
const {
    getMenus,
    postMenu,
    deleteMenus,
    getMenu,
    updateMenu,
    deleteMenu,
    getMenuRatings,
    postMenuRating,
    deleteMenuRatings,
    getMenuRating,
    updateMenuRating,
    deleteMenuRating

} = require('../controllers/menuController');
const reqRecievedLogger = require('../middlewares/reqRecievedLogger')
const {MenuValidator} = require('../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, getMenus)
    .post(reqRecievedLogger, MenuValidator, postMenu)
    .delete(reqRecievedLogger, deleteMenus)


    router.route('/:menuId')
    .get(reqRecievedLogger, getMenu)
    .put(reqRecievedLogger, updateMenu)
    .delete(reqRecievedLogger, deleteMenu)

    router.route('/:menuId/ratings')
    .get(reqRecievedLogger, getMenuRatings)
    .post(reqRecievedLogger, postMenuRating)
    .delete(reqRecievedLogger, deleteMenuRatings)

    router.route('/:menuId/ratings/:ratingId')
    .get(reqRecievedLogger, getMenuRating)
    .put(reqRecievedLogger, updateMenuRating)
    .delete(reqRecievedLogger, deleteMenuRating)


    module.exports = router;