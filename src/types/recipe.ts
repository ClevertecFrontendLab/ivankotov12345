export type NutritionValue = {
    calories: number;
    fats: number;
    carbohydrates: number;
} & ({ proteins: number; protein?: never } | { protein: number; proteins?: never });

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type Author = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers: string[];
};

export type MetaParams = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeType = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: RecipeStep[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
    authorData: Author;
};

export type RecipeListResponse = {
    data: RecipeType[];
    meta: MetaParams;
};
