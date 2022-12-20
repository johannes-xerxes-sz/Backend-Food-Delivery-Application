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
    deleteMenuRating,
    getMenuIngredients,
    postMenuIngredient,
    deleteMenuIngredients,
    getMenuIngredient,
    updateMenuIngredient,
    deleteMenuIngredient

} = require('../../controllers/deliveryController/menuController');
const reqRecievedLogger = require('../../middlewares/reqRecievedLogger')
const {menuValidator} = require('../../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, getMenus)
    .post(reqRecievedLogger, menuValidator, postMenu)
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

    router.route('/:menuId/ingredients')
    .get(reqRecievedLogger, getMenuIngredients)
    .post(reqRecievedLogger, postMenuIngredient)
    .delete(reqRecievedLogger, deleteMenuIngredients)
    
    router.route('/:menuId/ingredients/:ingredientId')
    .get(reqRecievedLogger, getMenuIngredient)
    .put(reqRecievedLogger, updateMenuIngredient)
    .delete(reqRecievedLogger, deleteMenuIngredient)


    module.exports = router;