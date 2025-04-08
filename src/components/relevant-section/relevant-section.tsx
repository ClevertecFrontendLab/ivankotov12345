import { Box, Flex, Heading, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react';

import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';
import { SUBTITLE_WIDTH } from '~/constants/styles';

import { RelevantCardMini } from './relevant-card-mini';
import { RelevantSectionCard } from './relevant-section-card';

const { title, subtitle } = PAGE_TITLES.vegan;

export const RelevantSection: React.FC = () => (
    <Box as='section' borderTop='blackAlpha'>
        <Flex py={6}>
            <Heading as='h2' variant='section'>
                {title}
            </Heading>

            <Spacer />

            <Text w={SUBTITLE_WIDTH}>{subtitle}</Text>
        </Flex>

        <SimpleGrid columns={2}>
            <SimpleGrid columns={2}>
                {VEGAN_RELEVANT_CARD_DATA.map((props) => (
                    <RelevantSectionCard key={props.id} {...props} />
                ))}
            </SimpleGrid>

            <VStack spacing={3}>
                {VEGAN_RELEVANT_CARD_DATA_MINI.map((props) => (
                    <RelevantCardMini key={props.id} {...props} />
                ))}
            </VStack>
        </SimpleGrid>
    </Box>
);
