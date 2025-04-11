import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';

import { RelevantCardMini } from './relevant-card-mini';
import { RelevantSectionCard } from './relevant-section-card';

const { title, subtitle } = PAGE_TITLES.vegan;

export const RelevantSection: React.FC = () => (
    <Box as='section' borderTop='blackAlpha' mb={20}>
        <SimpleGrid
            gridTemplateColumns={{
                base: '1fr',
                xl: '1fr 2fr',
                '2xl': '1fr 1fr',
            }}
            columns={2}
            gap={5}
            py={{ base: 3, '2xl': 5 }}
        >
            <Heading as='h2' variant='section' pr={3.5}>
                {title}
            </Heading>

            <Text color='blackAlpha.600' lineHeight='shorter'>
                {subtitle}
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
                {VEGAN_RELEVANT_CARD_DATA.map((props) => (
                    <RelevantSectionCard key={props.id} {...props} />
                ))}
            </SimpleGrid>

            <VStack spacing={{ base: 2, '2xl': 3 }}>
                {VEGAN_RELEVANT_CARD_DATA_MINI.map((props) => (
                    <RelevantCardMini key={props.id} {...props} />
                ))}
            </VStack>
        </SimpleGrid>
    </Box>
);
