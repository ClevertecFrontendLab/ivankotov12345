import { Button, Card, Heading, HStack, Image } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { getCardCategories } from '~/helpers/get-card-categories';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'categoriesIds' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ categoriesIds, title }) => {
    const { categories, subCategories } = useAppSelector(selectCategory);
    const cardCategories = getCardCategories(categories, subCategories, categoriesIds);
    const cardCategoryIcon = cardCategories[0].icon;
    return (
        <Card w={SIZES.full} p={0}>
            <HStack py={{ base: 2, lg: 3 }} px={{ base: 3, lg: 6 }}>
                <Image src={getFullImagePath(cardCategoryIcon)} />
                <Heading
                    as='h3'
                    fontSize={{ base: 'md', md: 'xl' }}
                    noOfLines={1}
                    fontWeight='medium'
                    w={SIZES.full}
                >
                    {title}
                </Heading>

                <Button
                    variant={STYLE_VARIANTS.outline}
                    color={COLORS_LIME[600]}
                    borderColor={COLORS_LIME[600]}
                    size='sm'
                    p={2}
                    flexShrink={0}
                >
                    Готовить
                </Button>
            </HStack>
        </Card>
    );
};
