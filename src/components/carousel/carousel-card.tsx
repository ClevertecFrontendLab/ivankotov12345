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
    VStack,
} from '@chakra-ui/react';
import React from 'react';

import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const CarouselCard: React.FC<CardData> = ({
    image,
    title,
    description,
    category,
    bookmarks,
    likes,
}) => (
    <Card
        w={{ base: 'carouselItem.sm', lg: 'carouselItem.md', '2xl': 'carouselItem.lg' }}
        minH='220px'
        overflow='hidden'
        borderRadius='lg'
        h='full'
    >
        <CardBody as={Flex} flexDirection='column' p={0}>
            <Image src={image} alt={title} h={{ base: 'imageHeight.md', lg: 'imageHeight.lg' }} />
            <Box pt={{ base: 3, '2xl': 4 }} px={{ base: 3, '2xl': 6 }}>
                <Heading as='h3' mb={2} variant='card'>
                    {title}
                </Heading>
                <Text noOfLines={3} fontSize='sm' display={{ base: 'none', lg: '-webkit-box' }}>
                    {description}
                </Text>
            </Box>

            <CardFooter
                flexDirection='column'
                flexGrow={1}
                justifyContent='end'
                mt={6}
                p={0}
                px={{ base: 3, '2xl': 6 }}
                pb={{ base: 3, '2xl': 5 }}
            >
                <Flex alignItems='start'>
                    <VStack layerStyle='absolute' top={2} left={2} alignItems='start'>
                        {category.map((item) => (
                            <CardBadge backgroundColor='lime.150' key={item} category={item} />
                        ))}
                    </VStack>

                    <Spacer />

                    <Box layerStyle='absolute' bottom={2} left={2}>
                        {bookmarks && (
                            <StatButton size='xs' quantity={bookmarks} icon={<LikeIcon />} />
                        )}
                        {likes && <StatButton size='xs' quantity={likes} icon={<FavoriteIcon />} />}
                    </Box>
                </Flex>
            </CardFooter>
        </CardBody>
    </Card>
);
