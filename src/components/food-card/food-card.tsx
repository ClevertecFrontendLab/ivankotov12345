import {
    Avatar,
    Badge,
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
import { NavLink, useLocation } from 'react-router';

import fallback from '~/assets/fallback.png';
import { FOOD_CARD_TYPES } from '~/constants/food-card-types';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { getCardCategories } from '~/helpers/get-card-categories';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useRecipePath } from '~/hooks/use-path-to-recipe';
import { useBookmarkRecipeMutation } from '~/query/services/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { selectSearchInput } from '~/store/slices/search-input-slice';
import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const FoodCard: React.FC<Partial<CardData>> = memo(
    ({
        _id,
        image,
        title,
        description,
        bookmarks,
        likes,
        categoriesIds,
        recommendedBy,
        index,
        cardType = FOOD_CARD_TYPES.regular,
    }) => {
        const { searchInputValue } = useAppSelector(selectSearchInput);
        const { categories, subCategories } = useAppSelector(selectCategory);

        const { pathname } = useLocation();

        const [bookmarkRecipe] = useBookmarkRecipeMutation();

        const onBookmarkRecipeClick = () => _id && bookmarkRecipe(_id);

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
                    src={image && getFullImagePath(image)}
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
                    w={SIZES.full}
                    alignItems='start'
                    pt={{ base: 2, lg: 5 }}
                    px={{ base: 2, lg: 6 }}
                    pb={{ base: 1, lg: 5 }}
                    spacing={{ base: 2, lg: 4 }}
                >
                    <CardHeader w={SIZES.full} p={0}>
                        <Flex>
                            <VStack
                                w={SIZES.full}
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

                            {cardType === FOOD_CARD_TYPES.draft ? (
                                <Badge
                                    py={0.5}
                                    px={{ base: 1, lg: 2 }}
                                    textTransform='capitalize'
                                    fontSize='sm'
                                    fontWeight='normal'
                                >
                                    Черновик
                                </Badge>
                            ) : (
                                <>
                                    <StatButton
                                        quantity={bookmarks}
                                        icon={<LikeIcon />}
                                        size={{ base: 'xs', lg: 'sm' }}
                                    />

                                    <StatButton
                                        quantity={likes}
                                        icon={<FavoriteIcon />}
                                        size={{ base: 'xs', lg: 'sm' }}
                                    />
                                </>
                            )}
                        </Flex>
                    </CardHeader>

                    <CardBody p={0}>
                        <Box>
                            <Heading as='h3' variant={STYLE_VARIANTS.cardHeading} mb={2}>
                                <Highlight
                                    query={searchInputValue}
                                    styles={{ color: COLORS_LIME[600] }}
                                >
                                    {title || ''}
                                </Highlight>
                            </Heading>
                            <Text
                                noOfLines={3}
                                fontSize='sm'
                                display={{ base: 'none', lg: '-webkit-box' }}
                            >
                                {description || '...'}
                            </Text>
                        </Box>
                    </CardBody>

                    <CardFooter
                        p={0}
                        display={cardType === FOOD_CARD_TYPES.regular ? 'block' : 'flex'}
                        justifyContent='end'
                        w={SIZES.full}
                    >
                        {cardType === FOOD_CARD_TYPES.regular && (
                            <ButtonGroup w={SIZES.full} justifyContent='flex-end'>
                                <Button
                                    variant={STYLE_VARIANTS.outline}
                                    leftIcon={<LikeIcon />}
                                    size={{ base: 'xs', lg: 'sm' }}
                                    borderColor={COLORS_BLACK_ALPHA[600]}
                                    iconSpacing={{ base: 0, lg: 0.5 }}
                                    onClick={onBookmarkRecipeClick}
                                >
                                    <Text display={{ base: 'none', lg: 'inline' }}>Сохранить</Text>
                                </Button>

                                <Button
                                    as={NavLink}
                                    to={recipePath}
                                    state={{ from: pathname }}
                                    size={{ base: 'xs', lg: 'sm' }}
                                    variant={STYLE_VARIANTS.black}
                                    data-test-id={`${DATA_TEST_ID.cardLink}-${index}`}
                                >
                                    Готовить
                                </Button>
                            </ButtonGroup>
                        )}

                        {(cardType === FOOD_CARD_TYPES.draft ||
                            cardType === FOOD_CARD_TYPES.userRecipe) && (
                            <Button
                                variant={
                                    cardType === FOOD_CARD_TYPES.draft
                                        ? STYLE_VARIANTS.black
                                        : STYLE_VARIANTS.outline
                                }
                                size={{ base: 'xs', lg: 'sm' }}
                            >
                                Редактировать
                            </Button>
                        )}
                    </CardFooter>
                </VStack>
            </Card>
        );
    },
);
