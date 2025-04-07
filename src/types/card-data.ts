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

export type UserData = {
    avatar: string;
    name: string;
    email: string;
};

export type BlogCardData = {
    id: number;
    user: UserData;
    message: string;
};
