type Subcategory = {
    category: string;
    path: string;
};

export type NavMenuItem = {
    category: string;
    image: string;
    path: string;
    subcategories: Subcategory[];
};
