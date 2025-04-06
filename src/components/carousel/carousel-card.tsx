import {
    Badge,
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
    <Card w='xs' overflow='hidden' borderRadius='lg'>
        <CardBody p={0}>
            <Image src={imgSrc} alt={title} />
            <Box pt={4} px={6}>
                <Heading as='h3' mb={2} noOfLines={1} fontSize='xl' lineHeight='short'>
                    {title}
                </Heading>
                <Text noOfLines={3} fontSize='sm'>
                    {description}
                </Text>
            </Box>

            <CardFooter display='block' mt={6} px={6} pb={5}>
                <Flex alignItems='center'>
                    <Badge
                        borderRadius='base'
                        py={0.5}
                        px={2}
                        bg='lime.150'
                        fontSize='sm'
                        fontWeight='normal'
                    >
                        {category}
                    </Badge>

                    <Spacer />

                    {likes && <StatButton size='xs' quantity={likes} icon={<LikeIcon />} />}
                    {favorites && (
                        <StatButton size='xs' quantity={favorites} icon={<FavoriteIcon />} />
                    )}
                </Flex>
            </CardFooter>
        </CardBody>
    </Card>
);
