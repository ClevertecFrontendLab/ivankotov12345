import { Box, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';

import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { DATA_TEST_ID } from '~/constants/test-id';

import { FoodCard } from '../../../../components/food-card';
import { JuiciestButton } from './juiciest-button';

const { title } = PAGE_TITLES.juiciest;

const CARDS_LENGTH = 4;

const juiciestCardData = CARD_DATA.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(
    0,
    CARDS_LENGTH,
);

export const JuiciestSection: React.FC = () => (
    <Box as='section' mb={{ base: 8, lg: 10 }}>
        <Flex alignItems='center' mb={{ base: 4, '2xl': 6 }}>
            <Heading variant='section'>{title}</Heading>

            <Spacer />

            <Box display={{ base: 'none', lg: 'block' }}>
                <JuiciestButton testId={DATA_TEST_ID.juiciestLink} />
            </Box>
        </Flex>

        <SimpleGrid columns={{ md: 2, lg: 1, '2xl': 2 }} spacing={{ base: 3, lg: 4, '2xl': 6 }}>
            {juiciestCardData.map((props, index) => (
                <FoodCard key={props.id} {...props} index={index} />
            ))}
        </SimpleGrid>

        <Flex justifyContent='center' pt={4} display={{ base: 'flex', lg: 'none' }}>
            <JuiciestButton testId={DATA_TEST_ID.juiciestLinkMobile} />
        </Flex>
    </Box>
);
