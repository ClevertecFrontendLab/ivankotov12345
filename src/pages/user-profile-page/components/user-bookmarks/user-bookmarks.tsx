import { Flex } from '@chakra-ui/react';
import React from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { TitleWithCount } from '~/components/title-with-count';
import { FOOD_CARD_TYPES } from '~/constants/food-card-types';
import { RecipeType } from '~/types/recipe';

export const UserBookmarks: React.FC<{ bookmarks: RecipeType[] }> = ({ bookmarks }) => (
    <Flex direction='column' mt={10} gap={4}>
        <TitleWithCount title='Мои закладки' count={bookmarks.length} />
        <CardsWrapper>
            {bookmarks.map((recipe) => (
                <FoodCard key={recipe._id} {...recipe} cardType={FOOD_CARD_TYPES.bookmark} />
            ))}
        </CardsWrapper>
    </Flex>
);
