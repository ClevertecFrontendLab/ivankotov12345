type RecommendedByType = {
    avatarSrc?: string;
    name: string;
};

export type CardData = {
    id: number;
    imgSrc: string;
    title: string;
    description: string;
    category: string;
    likes?: number;
    favorites?: number;
    recommendedBy?: RecommendedByType;
};
