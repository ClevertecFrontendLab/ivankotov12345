import bloger1 from '~/assets/img/Bloger-1.jpg';
import bloger2 from '~/assets/img/Bloger-2.jpg';
import ham from '~/assets/img/ham.jpg';
import knelli from '~/assets/img/knelli.jpg';
import noodles from '~/assets/img/noodles.jpg';
import tomYam from '~/assets/img/tom-yam.jpg';
import { CardData } from '~/types/card-data';

export const JUICIEST_CARD_DATA: CardData[] = [
    {
        id: 1,
        image: knelli,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 2,
        image: ham,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        bookmarks: 159,
        likes: 257,
        recommendedBy: {
            avatar: bloger1,
            name: 'Елена Высоцкая',
        },
    },
    {
        id: 3,
        image: noodles,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        bookmarks: 258,
        likes: 342,
        recommendedBy: {
            avatar: bloger2,
            name: 'Alex Cook',
        },
    },
    {
        id: 4,
        image: tomYam,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Национальные',
        bookmarks: 124,
        likes: 324,
    },
];
