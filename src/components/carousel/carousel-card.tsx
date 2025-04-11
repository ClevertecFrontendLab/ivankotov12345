import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Spacer,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const CarouselCard: React.FC<CardData> = ({
    imgSrc,
    title,
    description,
    category,
    likes,
    favorites,
}) => (
    <Card
        w={{ base: 'carouselItem.sm', lg: 'carouselItem.md', '2xl': 'carouselItem.lg' }}
        minH='220px'
        overflow='hidden'
        borderRadius='lg'
    >
        <CardBody p={0}>
            <Image src={imgSrc} alt={title} h={{ base: 'imageHeight.md', lg: 'imageHeight.lg' }} />
            <Box pt={{ base: 3, '2xl': 4 }} px={{ base: 3, '2xl': 6 }}>
                <Heading as='h3' mb={2} variant='card'>
                    {title}
                </Heading>
                <Text noOfLines={3} fontSize='sm' display={{ base: 'none', lg: '-webkit-box' }}>
                    {description}
                </Text>
            </Box>

            <CardFooter
                display='block'
                mt={6}
                p={0}
                px={{ base: 3, '2xl': 6 }}
                pb={{ base: 3, '2xl': 5 }}
            >
                <Flex alignItems='center'>
                    <Box layerStyle='absolute' top={2} left={2}>
                        <CardBadge backgroundColor='lime.150' category={category} />
                    </Box>

                    <Spacer />

                    <Box layerStyle='absolute' bottom={2} left={2}>
                        {likes && <StatButton size='xs' quantity={likes} icon={<LikeIcon />} />}
                        {favorites && (
                            <StatButton size='xs' quantity={favorites} icon={<FavoriteIcon />} />
                        )}
                    </Box>
                </Flex>
            </CardFooter>
        </CardBody>
    </Card>
);
