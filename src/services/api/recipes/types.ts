type RecipeCuisine = {
    id: number;
    title: string;
}

export type Recipe = {
    id: number;
    title: string;
    description: string;
    caloricity: number;
    cookTime: number;
    thumbnail: string;
    cuisine: RecipeCuisine;
}

export type ExtendedRecipe = Recipe & {
    difficulty: "easy" | "medium" | "hard";
    images: string[];
    ingredients: string[];
    instructions: string[];
}

/**
 * Получение всех рецептов Dto & Response
 */

export type GetAllRecipesResponse = {
    recipes: Recipe[]
}

/**
 * Получение одно рецепта Dto & Response
 */

export type GetRecipeResponse = { recipe: ExtendedRecipe };
export type GetRecipeDto = { id: Recipe['id'] }
