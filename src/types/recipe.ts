export type NutritionsValueType = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type IngredientType = {
    title: string;
    count: string;
    measureUnit: string;
};

export type RecipeStepType = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type RecipeType = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks?: number;
    likes?: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionsValueType;
    ingredients: IngredientType[];
    steps: RecipeStepType[];
    author?: string;
    meat?: string;
    side?: string;
};
