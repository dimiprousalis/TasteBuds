import { RecipeModel } from '../models/Recipes.js';


/*--------------------CREATE RECIPE---------------------- */
export const createRecipe = async (req, res) => {
    const { name, ingredients, instructions, imageUrl, userOwner } = req.body;

    const recipe = new RecipeModel({ name, ingredients, instructions, imageUrl, userOwner });

    try {
        const response = await recipe.save()
        res.json(response);
    } catch (err) {
        res.json(err)
    }
};
