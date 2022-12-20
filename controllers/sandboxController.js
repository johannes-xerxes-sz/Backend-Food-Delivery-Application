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