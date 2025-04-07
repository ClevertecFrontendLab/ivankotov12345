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
        imgSrc: knelli,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        likes: 85,
        favorites: 152,
    },
    {
        id: 2,
        imgSrc: ham,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        likes: 159,
        favorites: 257,
        recommendedBy: {
            avatarSrc: bloger1,
            name: 'Елена Высоцкая',
        },
    },
    {
        id: 3,
        imgSrc: noodles,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        likes: 258,
        favorites: 342,
        recommendedBy: {
            avatarSrc: bloger2,
            name: 'Alex Cook',
        },
    },
    {
        id: 4,
        imgSrc: tomYam,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Национальные',
        likes: 124,
        favorites: 324,
    },
];
