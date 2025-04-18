import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Spacer,
    Tag,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const FoodCard: React.FC<CardData> = ({
    imgSrc,
    title,
    description,
    likes,
    favorites,
    category,
    recommendedBy,
}) => (
    <Card direction='row' overflow='hidden' borderRadius='lg'>
        <Image
            src={imgSrc}
            alt={title}
            maxW={{ base: 'carouselItem.sm', lg: 'carouselItem.xl' }}
            minH='128px'
            objectFit='cover'
        />

        {recommendedBy && (
            <Tag
                pos='absolute'
                left={6}
                bottom={5}
                bg='lime.150'
                py={1}
                px={2}
                display={{ base: 'none', lg: 'flex' }}
            >
                <Avatar src={recommendedBy.avatar} name={recommendedBy.name} w={4} h={4} />
                <TagLabel ml={2} fontSize='sm' fontWeight='normal' lineHeight='short'>
                    {recommendedBy.name} рекомендует
                </TagLabel>
            </Tag>
        )}

        <VStack
            w='full'
            alignItems='start'
            pt={{ base: 2, lg: 5 }}
            px={{ base: 2, lg: 6 }}
            pb={{ base: 1, lg: 5 }}
            spacing={{ base: 2, lg: 4 }}
        >
            <CardHeader w='full' p={0}>
                <Flex>
                    <Box layerStyle='absolute' top={2} left={2}>
                        <CardBadge backgroundColor='lime.50' category={category} />
                    </Box>

                    <Spacer display={{ base: 'none', lg: 'flex' }} />

                    {likes && (
                        <StatButton
                            quantity={likes}
                            icon={<LikeIcon />}
                            size={{ base: 'xs', lg: 'sm' }}
                        />
                    )}
                    {favorites && (
                        <StatButton
                            quantity={favorites}
                            icon={<FavoriteIcon />}
                            size={{ base: 'xs', lg: 'sm' }}
                        />
                    )}
                </Flex>
            </CardHeader>

            <CardBody p={0}>
                <Box>
                    <Heading as='h3' variant='card' mb={2}>
                        {title}
                    </Heading>
                    <Text noOfLines={3} fontSize='sm' display={{ base: 'none', lg: '-webkit-box' }}>
                        {description}
                    </Text>
                </Box>
            </CardBody>

            <CardFooter p={0} display='block' w='full'>
                <ButtonGroup w='full' justifyContent='flex-end'>
                    <Button
                        variant='outline'
                        leftIcon={<LikeIcon />}
                        size={{ base: 'xs', lg: 'sm' }}
                        borderColor='blackAlpha.600'
                        iconSpacing={{ base: 0, lg: 0.5 }}
                    >
                        <Text display={{ base: 'none', lg: 'inline' }}>Сохранить</Text>
                    </Button>

                    <Button size={{ base: 'xs', lg: 'sm' }} variant='black'>
                        Готовить
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </VStack>
    </Card>
);
