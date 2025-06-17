import { UserStatistics } from '~/types/user';

export const getTotalStatistic = ({ likes, bookmarks, recommendationsCount }: UserStatistics) => ({
    likes: likes.reduce((sum, { count }) => sum + count, 0),
    bookmarks: bookmarks.reduce((sum, { count }) => sum + count, 0),
    recommendationsCount,
});
