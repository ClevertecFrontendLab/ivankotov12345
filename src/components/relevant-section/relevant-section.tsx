import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

import { RelevantCardMini } from './relevant-card-mini';
import { RelevantSectionCard } from './relevant-section-card';

type RelevantSectionProps = {
    title: string;
    subtitle: string;
    cardData: Omit<CardData, 'imgSrc' | 'recommendedBy'>[];
    cardDataMini: Pick<CardData, 'id' | 'imgSrc' | 'title'>[];
};

export const RelevantSection: React.FC<RelevantSectionProps> = ({
    title,
    subtitle,
    cardData,
    cardDataMini,
}) => (
    <Box as='section' borderTop='blackAlpha' mb={{ base: 20, lg: 0 }}>
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
                {cardData.map((props) => (
                    <RelevantSectionCard key={props.id} {...props} />
                ))}
            </SimpleGrid>

            <VStack spacing={{ base: 2, '2xl': 3 }}>
                {cardDataMini.map((props) => (
                    <RelevantCardMini key={props.id} {...props} />
                ))}
            </VStack>
        </SimpleGrid>
    </Box>
);
