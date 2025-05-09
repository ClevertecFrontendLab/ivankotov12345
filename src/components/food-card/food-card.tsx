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
    Highlight,
    Image,
    Spacer,
    Tag,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { memo } from 'react';
import { NavLink } from 'react-router';

import fallback from '~/assets/fallback.png';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { getCardCategories } from '~/helpers/get-card-categories';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useRecipePath } from '~/hooks/use-path-to-recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { selectSearchInput } from '~/store/slices/search-input-slice';
import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const FoodCard: React.FC<CardData> = memo(
    ({ _id, image, title, description, bookmarks, likes, categoriesIds, recommendedBy, index }) => {
        const { searchInputValue } = useAppSelector(selectSearchInput);
        const { categories, subCategories } = useAppSelector(selectCategory);

        const cardCategories = getCardCategories(categories, subCategories, categoriesIds);

        const recipePath = useRecipePath({ _id, categoriesIds, subCategories, categories });

        return (
            <Card
                direction='row'
                overflow='hidden'
                borderRadius='lg'
                data-test-id={`${DATA_TEST_ID.foodCard}-${index}`}
            >
                <Image
                    src={getFullImagePath(image)}
                    alt={title}
                    maxW={{ base: 'carouselItem.sm', lg: 'carouselItem.xl' }}
                    minH='imageHeight.md'
                    objectFit='cover'
                    fallbackSrc={fallback}
                />

                {recommendedBy && (
                    <Tag
                        pos='absolute'
                        left={6}
                        bottom={5}
                        bg={COLORS_LIME[150]}
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
                            <VStack
                                w='full'
                                alignItems='start'
                                layerStyle='absolute'
                                top={2}
                                left={2}
                            >
                                {cardCategories.map(({ _id, title, icon }) => (
                                    <CardBadge
                                        backgroundColor={COLORS_LIME[50]}
                                        key={_id}
                                        title={title}
                                        icon={icon}
                                    />
                                ))}
                            </VStack>

                            <Spacer display={{ base: 'none', lg: 'flex' }} />

                            {bookmarks > 0 && (
                                <StatButton
                                    quantity={bookmarks}
                                    icon={<LikeIcon />}
                                    size={{ base: 'xs', lg: 'sm' }}
                                />
                            )}
                            {likes > 0 && (
                                <StatButton
                                    quantity={likes}
                                    icon={<FavoriteIcon />}
                                    size={{ base: 'xs', lg: 'sm' }}
                                />
                            )}
                        </Flex>
                    </CardHeader>

                    <CardBody p={0}>
                        <Box>
                            <Heading as='h3' variant='card' mb={2}>
                                <Highlight
                                    query={searchInputValue}
                                    styles={{ color: COLORS_LIME[600] }}
                                >
                                    {title}
                                </Highlight>
                            </Heading>
                            <Text
                                noOfLines={3}
                                fontSize='sm'
                                display={{ base: 'none', lg: '-webkit-box' }}
                            >
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
                                borderColor={COLORS_BLACK_ALPHA[600]}
                                iconSpacing={{ base: 0, lg: 0.5 }}
                            >
                                <Text display={{ base: 'none', lg: 'inline' }}>Сохранить</Text>
                            </Button>

                            <Button
                                as={NavLink}
                                to={recipePath}
                                size={{ base: 'xs', lg: 'sm' }}
                                variant='black'
                                data-test-id={`${DATA_TEST_ID.cardLink}-${index}`}
                            >
                                Готовить
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </VStack>
            </Card>
        );
    },
);
