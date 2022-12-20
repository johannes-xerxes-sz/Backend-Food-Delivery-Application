router.route('/:menuId/ingredients')
.get(reqRecievedLogger, getMenuIngredients)
.post(reqRecievedLogger, postMenuIngredient)
.delete(reqRecievedLogger, deleteMenuIngredients)

router.route('/:menuId/ingredients/:ingredientId')
.get(reqRecievedLogger, getMenuIngredient)
.put(reqRecievedLogger, updateMenuIngredient)
.delete(reqRecievedLogger, deleteMenuIngredient)