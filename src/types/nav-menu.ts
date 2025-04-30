export type Subcategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type NavMenuItem = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: Subcategory[];
};
