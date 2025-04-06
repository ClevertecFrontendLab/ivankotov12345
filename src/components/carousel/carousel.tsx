import { Box, Heading, HStack } from '@chakra-ui/react';

import { CAROUSEL_CARD_DATA } from '~/constants/carousel-card-data';

import { CarouselCard } from './carousel-card';

export const Сarousel: React.FC = () => (
    <Box as='section' mb={10}>
        <Heading as='h2' fontSize='5xl' fontWeight='medium' lineHeight='none' mb={6}>
            Новые рецепты
        </Heading>
        <HStack gap={6}>
            {CAROUSEL_CARD_DATA.map((props) => (
                <CarouselCard key={props.title} {...props} />
            ))}
        </HStack>
    </Box>
);
