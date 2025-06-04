export type BloggerNotes = {
    date: string;
    text: string;
};

export type BloggerType = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: BloggerNotes[];
    newRecipesCount: number;
    avatar?: string;
};

export type BloggerResponse = {
    favorites: BloggerType[];
    others: BloggerType[];
};

export type SubscriptionRequest = {
    toUserId: string;
    fromUserId: string;
};
