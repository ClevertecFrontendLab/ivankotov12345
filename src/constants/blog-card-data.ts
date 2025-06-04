import bloger1 from '~/assets/img/Bloger-1.jpg';
import bloger2 from '~/assets/img/Bloger-2.jpg';
import bloger3 from '~/assets/img/Bloger-3.jpg';
import { BlogCardData } from '~/types/card-data';

export const BLOG_CARD_DATA: BlogCardData[] = [
    {
        id: 1,
        user: {
            name: 'Елена Высоцкая',
            email: '@elenapovar',
            avatar: bloger1,
        },
        message:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 2,
        user: {
            name: 'Alex Cook',
            email: '@funtasticooking',
            avatar: bloger2,
        },
        message:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 3,
        user: {
            name: 'Екатерина Константинопольская',
            email: '@bake_and_pie',
            avatar: bloger3,
        },
        message:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];

export const BLOG_CARD_TYPE = {
    anyBlogger: 'anyBlogger',
    favoritesBlogger: 'favoritesBlogger',
} as const;
