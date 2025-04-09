type SubCategory = {
    category: string;
    path: string;
};

export type NavMenuItem = {
    category: string;
    imgSrc: string;
    subCategories: SubCategory[];
};
