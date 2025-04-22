import { Box, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';

import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { useAllergenFilter } from '~/hooks/useAllergenFilter';
import { useAppSelector } from '~/store/hooks';
import { selectFilteredRecipes } from '~/store/slices/flter-recipe-slice';

import { FoodCard } from '../food-card';
import { JuiciestButton } from './juiciest-button';

const { title } = PAGE_TITLES.juiciest;

const CardDataNotFiltered = CARD_DATA.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 4);

export const JuiciestSection: React.FC = () => {
    const { filteredRecipes } = useAppSelector(selectFilteredRecipes);

    useAllergenFilter(CARD_DATA);

    const juiciestCardData = filteredRecipes.length ? filteredRecipes : CardDataNotFiltered;
    return (
        <Box as='section' mb={{ base: 8, lg: 10 }}>
            <Flex alignItems='center' mb={{ base: 4, '2xl': 6 }}>
                <Heading variant='section'>{title}</Heading>

                <Spacer />

                <Box display={{ base: 'none', lg: 'block' }}>
                    <JuiciestButton testId='juiciest-link' />
                </Box>
            </Flex>

            <SimpleGrid columns={{ md: 2, lg: 1, '2xl': 2 }} spacing={{ base: 3, lg: 4, '2xl': 6 }}>
                {juiciestCardData.map((props) => (
                    <FoodCard key={props.id} {...props} />
                ))}
            </SimpleGrid>

            <Flex justifyContent='center' pt={4} display={{ base: 'flex', lg: 'none' }}>
                <JuiciestButton testId='juiciest-link-mobile' />
            </Flex>
        </Box>
    );
};
