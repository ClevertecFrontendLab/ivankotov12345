import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';

import { CAROUSEL_CARD_DATA } from '~/constants/carousel-card-data';
import { PAGE_TITLES } from '~/constants/page-titles';

import { CarouselCard } from './carousel-card';

const { title } = PAGE_TITLES.newest;

export const Сarousel: React.FC = () => (
    <Box as='section' mt={{ base: 0, lg: 6 }} mb={{ base: 8, xl: 10 }}>
        <Heading as='h2' variant='section' mb={6}>
            {title}
        </Heading>
        <Box pos='relative'>
            <IconButton
                size='lg'
                icon={<ArrowBackIcon />}
                aria-label='carousel button back'
                pos='absolute'
                top='calc(50% - 38px)'
                transform='translate(-10%, -50%)'
                zIndex={2}
                variant='black'
                display={{ base: 'none', lg: 'block' }}
            />

            <Box overflowX='hidden'>
                <HStack
                    justifyContent='space-between'
                    width='max-content'
                    gap={{ base: 3, '2xl': 6 }}
                >
                    {CAROUSEL_CARD_DATA.map((props) => (
                        <CarouselCard key={props.id} {...props} />
                    ))}
                </HStack>
            </Box>

            <IconButton
                size='lg'
                icon={<ArrowForwardIcon />}
                aria-label='carousel button forward'
                pos='absolute'
                top='calc(50% - 38px)'
                transform='translate(20%, -50%)'
                right='0'
                zIndex={2}
                variant='black'
                display={{ base: 'none', lg: 'block' }}
            />
        </Box>
    </Box>
);
