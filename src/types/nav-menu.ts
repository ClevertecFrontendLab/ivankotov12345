type SubCategory = {
    category: string;
    path: string;
};

export type NavMenuItem = {
    category: string;
    imgSrc: string;
    path: string;
    subCategories: SubCategory[];
};
