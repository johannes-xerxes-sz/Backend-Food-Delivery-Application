const Menu = require('../../models/delivery/Menu');

//! For ‘/’ startpoint: 

const getMenus = async (req, res, next) => {

    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            name,
            restaurant,
            type,
            price,
            sortByName
        } = req.query

        if (name) filter.name = true;
        if (restaurant) filter.restaurant = true;
        if (type) filter.type = true;
        if (price) filter.price = true;


        if (limit) options.limit = limit;
        if (sortByName) {
            options.sort = {
              name: sortByName === 'asc' ? 1 : -1
            };
          }
    }

    try {
        const menus = await Menu.find({}, filter, options);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(menus)
    }
    catch (err) {
        throw new Error(`Error retrieving menu: ${err.message}`);
    }



}

const postMenu = async (req, res, next) => {
    try {
        const menu = await Menu.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(menu)
    }
    catch (err) {
        throw new Error(`Error retrieving menus: ${err.message}`);
    }
    
    
    

}

const deleteMenus = async  (req, res, next) => {
    try {
        await Menu.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg:'Deleted all menus'})
    }
    catch (err) {
        throw new Error(`Error deleting menus: ${err.message}`);

    }

}
//! For ‘/’ endpoint: 
//! For menuId startpoint: 

const getMenu = async  (req, res, next) => {
    try {
        const result = await Menu.findById(req.params.menuId);
        
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
    }
    catch (err) {
        throw new Error(`Error retrieving menu with id of: ${req.params.menuId} ${err.message}`);
    }

}

const updateMenu = async  (req, res, next) => {
    try {
        const result = await Menu.findByIdAndUpdate(req.params.menuId, {
            $set: req.body
        }, { new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result) 
    }
    catch (err) {
        throw new Error(`Error updating menu with id of: ${req.params.menuId} ${err.message}`);
    }

}

const deleteMenu = async  (req, res, next) => {
    try {
        await Menu.findByIdAndDelete(req.params.menuId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `Deleted the menu with id: ${req.params.menuId}`}) 
    }
    catch (err) {
        throw new Error(`Error deleting menu with id of: ${req.params.menuId} ${err.message}`);
    }

}
//! For menuId endpoint: 

//! For '/:menuId/ratings' startpoint

const getMenuRatings = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        const ratings = menu.ratings;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    }
    catch (err) {
        throw new Error (`Error retrieving all ratings: ${err.message}`)
    }
}

const postMenuRating = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        menu.ratings.push(req.body);
        
        const result = await menu.save();
        res
        .status(201) //need_clarify
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error posting a menu rating: ${err.message}`)
    }
}

const deleteMenuRatings = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        menu.ratings = [];
        await menu.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all ratings`})
    }
    catch (err) {
        throw new Error(`Error deleting all ratings: ${err.message}`)
    }
}

//! For '/:menuId/ratings' endpoint
//! For '/:menuId/ratings/:ratingId' startpoint

const getMenuRating = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId)
        const rating = menu.ratings.find(rating => (rating._id).equals(req.params.ratingId))
        if(!rating) {rating = {success:false, msg: `No rating found with rating id: ${req.params.ratingId}`}}
        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error (`Error retrieving rating with id: ${req.params.ratingId}, ${err.message}`)
    }
}

const updateMenuRating = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        let rating = menu.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if(rating) {
            const ratingIndexPosition = menu.ratings.indexOf(rating)
            menu.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = menu.ratings[ratingIndexPosition]
            await menu.save();
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
        throw new Error (`Error updating menu with Id: ${req.params.ratingId}:${err.message}`)
    }
}

const deleteMenuRating = async (req, res, next) => {
    try {
    let menu = await Menu.findById(req.params.menuId);
    let rating = menu.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        if (rating) {
            const ratingIndexPosition = menu.ratings.indexOf(rating);
            menu.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with Id: ${req.params.ratingId} deleted`}
            await menu.save();

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


//! For '/:menuId/ratings/:ratingId' endpoint

//! For '/:menuId/ingredients' startpoint

const getMenuIngredients = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        const ingredients = menu.ingredients;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ingredients)

    }
    catch (err) {
        throw new Error (`Error retrieving all ingredients: ${err.message}`)
    }
}

const postMenuIngredient = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        menu.ingredients.push(req.body);
        
        const result = await menu.save();
        res
        .status(201) //need_clarify
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error posting a menu ingredient: ${err.message}`)
    }
}

const deleteMenuIngredients = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        menu.ingredients = [];
        await menu.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all ingredients`})
    }
    catch (err) {
        throw new Error(`Error deleting all ingredients: ${err.message}`)
    }
}

//! For '/:menuId/ingredients' endpoint
//! For '/:menuId/ingredients/:ingredientId' startpoint

const getMenuIngredient = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId)
        const ingredient = menu.ingredients.find(ingredient => (ingredient._id).equals(req.params.ingredientId))
        if(!ingredient) {ingredient = {success:false, msg: `No ingredient found with ingredient id: ${req.params.ingredientId}`}}
        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(ingredient)

    } catch (err) {
        throw new Error (`Error retrieving ingredient with id: ${req.params.ingredientId}, ${err.message}`)
    }
}

const updateMenuIngredient = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        let ingredient = menu.ingredients.find(ingredient => (ingredient._id).equals(req.params.ingredientId))

        if(ingredient) {
            const ingredientIndexPosition = menu.ingredients.indexOf(ingredient)
            menu.ingredients.splice(ingredientIndexPosition, 1, req.body);
            ingredient = menu.ingredients[ingredientIndexPosition]
            await menu.save();
        }
        else {
            ingredient = {success: false, msg: `No ingredient found with the id: ${req.params.ingredientId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ingredient);
    }
    catch (err) {
        throw new Error (`Error updating menu with Id: ${req.params.ingredientId}:${err.message}`)
    }
}

const deleteMenuIngredient = async (req, res, next) => {
    try {
    let menu = await Menu.findById(req.params.menuId);
    let ingredient = menu.ingredients.find(ingredient => (ingredient._id).equals(req.params.ingredientId));
        if (ingredient) {
            const ingredientIndexPosition = menu.ingredients.indexOf(ingredient);
            menu.ingredients.splice(ingredientIndexPosition, 1);
            ingredient = {success: true, msg: `Ingredient with Id: ${req.params.ingredientId} deleted`}
            await menu.save();

        }
        else {
            ingredient = {success: false, msg: `No ingredient found with the id: ${req.params.ingredientId}`}
        }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(ingredient)

    }
    catch (err) {
        throw new Error (`Error deleting ingredient with Id: ${req.params.ingredientId} : ${err.message}`)
    }
}


module.exports = {

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

}