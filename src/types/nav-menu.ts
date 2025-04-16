type SubCategory = {
    category: string;
    path: string;
};

export type NavMenuItem = {
    category: string;
    image: string;
    path: string;
    subCategories: SubCategory[];
};
