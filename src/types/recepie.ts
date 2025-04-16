type NutritionsValueType = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

type IngredientType = {
    title: string;
    count: string;
    measureUnit: string;
};

type RecepieStepType = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type RecepieType = {
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
    steps: RecepieStepType[];
    meat?: string;
    side?: string;
};
