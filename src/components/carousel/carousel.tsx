import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';

import { CAROUSEL_CARD_DATA } from '~/constants/carousel-card-data';
import { PAGE_TITLES } from '~/constants/page-titles';

import { CarouselCard } from './carousel-card';

const { title } = PAGE_TITLES.newest;

export const Сarousel: React.FC = () => (
    <Box as='section' mb={10}>
        <Heading as='h2' variant='section' mb={6}>
            {title}
        </Heading>
        <Box pos='relative'>
            <IconButton
                size='lg'
                icon={<ArrowBackIcon />}
                aria-label='carousel button back'
                pos='absolute'
                top='calc(50% - 24px)'
                transform='translate(-25%, -50%)'
                zIndex={2}
                variant='black'
            />

            <HStack justifyContent='space-between'>
                {CAROUSEL_CARD_DATA.map((props) => (
                    <CarouselCard key={props.id} {...props} />
                ))}
            </HStack>

            <IconButton
                size='lg'
                icon={<ArrowForwardIcon />}
                aria-label='carousel button forward'
                pos='absolute'
                top='calc(50% - 24px)'
                transform='translate(25%, -50%)'
                right='0'
                zIndex={2}
                variant='black'
            />
        </Box>
    </Box>
);
