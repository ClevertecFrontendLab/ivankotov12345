import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { useLazyGetRecipesByCategoryQuery } from '~/query/services/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';

import { getRandomSubCategory } from './helpers/get-random-sub-category';
import { RelevantCardMini } from './relevant-card-mini';
import { RelevantSectionCard } from './relevant-section-card';

const CARD_DATA_LIMIT = 5;
const CARDS_LENGTH = 2;

export const RelevantSection: React.FC = () => {
    const { categories, subCategories } = useAppSelector(selectCategory);
    const randomSubCategory = useMemo(() => getRandomSubCategory(subCategories), [subCategories]);
    const randomCategory = useMemo(
        () => categories.find(({ _id }) => _id === randomSubCategory?.rootCategoryId),
        [randomSubCategory, categories],
    );

    const [trigger, { data }] = useLazyGetRecipesByCategoryQuery();

    const cardsData = data?.data.slice(0, CARDS_LENGTH);
    const cardsDataMini = data?.data.slice(CARDS_LENGTH, CARD_DATA_LIMIT);

    useEffect(() => {
        if (randomSubCategory) {
            trigger({ id: randomSubCategory._id, limit: CARD_DATA_LIMIT });
        }
    }, [randomSubCategory, trigger]);

    return (
        <Box as='section' borderTop='blackAlpha' mb={{ base: 20, lg: 0 }}>
            <SimpleGrid
                gridTemplateColumns={{
                    base: '1fr',
                    xl: '1fr 2fr',
                    '2xl': '1fr 1fr',
                }}
                columns={2}
                gap={5}
                py={{ base: 6, '2xl': 5 }}
            >
                <Heading as='h2' variant='section' pr={3.5}>
                    {randomCategory?.title}
                </Heading>

                <Text color={COLORS_BLACK_ALPHA[600]} lineHeight='shorter'>
                    {randomCategory?.description}
                </Text>
            </SimpleGrid>

            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gridTemplateColumns={{
                    base: '1fr',
                    md: '2fr 1fr',
                    '2xl': '1fr 1fr',
                }}
                gridTemplateRows={{
                    base: '1fr .5fr',
                    md: '1fr',
                }}
                gap={{ base: 4, '2xl': 6 }}
            >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, '2xl': 6 }}>
                    {cardsData &&
                        cardsData.map((props) => (
                            <RelevantSectionCard key={props._id} {...props} />
                        ))}
                </SimpleGrid>

                <VStack spacing={{ base: 2, '2xl': 3 }}>
                    {cardsDataMini &&
                        cardsDataMini.map((props) => (
                            <RelevantCardMini key={props._id} {...props} />
                        ))}
                </VStack>
            </SimpleGrid>
        </Box>
    );
};
