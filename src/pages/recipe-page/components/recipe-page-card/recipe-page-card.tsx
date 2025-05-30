import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Spacer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { CardBadge } from '~/components/card-badge';
import { FavoriteIcon, LikeIcon, TimerIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { EDIT_ITEM_PATH, ROUTER_PATHS } from '~/constants/router-paths';
import { DELETE_RECIPE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { getCardCategories } from '~/helpers/get-card-categories';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useDeleteRecipeMutation } from '~/query/services/create-recipe';
import { useBookmarkRecipeMutation, useLikeRecipeMutation } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectUserId, setToastData, setToastIsOpen } from '~/store/slices/app-slice';
import { selectCategory } from '~/store/slices/category-slice';
import { RecipeType } from '~/types/recipe';

export type RecipePageCardProps = Pick<
    RecipeType,
    | 'image'
    | 'title'
    | 'description'
    | 'categoriesIds'
    | 'bookmarks'
    | 'likes'
    | 'time'
    | 'authorId'
>;

export const RecipePageCard: React.FC<RecipePageCardProps> = ({
    image,
    title,
    description,
    categoriesIds,
    bookmarks,
    likes,
    time,
    authorId,
}) => {
    const userId = useAppSelector(selectUserId);
    const navigate = useNavigate();
    const { categories, subCategories } = useAppSelector(selectCategory);
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const { pathname } = useLocation();

    const onEditRecipeClick = () => navigate(`${EDIT_ITEM_PATH}${pathname}`);

    const onDeleteRecipeClick = async () => {
        try {
            if (id) {
                await deleteRecipe(id).unwrap();
                dispatch(setToastData(DELETE_RECIPE_STATUS[RESPONSE_STATUS.SUCCESS]));
                dispatch(setToastIsOpen(true));
                navigate(ROUTER_PATHS.homePage);
            }
        } catch {
            return;
        }
    };

    const onLikeRecipeClick = async () => {
        if (id) {
            await likeRecipe(id);
        }
    };

    const onBookmarkRecipeClick = async () => {
        if (id) {
            await bookmarkRecipe(id);
        }
    };

    const cardCategories = getCardCategories(categories, subCategories, categoriesIds);

    const isUserAuthor = authorId === userId;
    return (
        <Card
            flexDirection={{ base: 'column', md: 'row' }}
            w={SIZES.full}
            gap={{ base: 4, lg: 6 }}
            variant={STYLE_VARIANTS.none}
            _hover={{
                boxShadow: 'none',
            }}
        >
            <Image
                maxW={{ base: SIZES.full, md: 'recipeImageWidth.md', lg: 'recipeImageWidth.lg' }}
                w={SIZES.full}
                height={{ base: 'auto', lg: 'imageHeight.xl' }}
                src={getFullImagePath(image)}
                alt={title}
                borderRadius='lg'
                overflow='hidden'
                objectFit='cover'
            />

            <VStack alignItems='start'>
                <CardHeader w={SIZES.full} p={0}>
                    <Flex>
                        <HStack flexWrap='wrap'>
                            {cardCategories.map(({ title, icon }) => (
                                <CardBadge
                                    backgroundColor='lime.50'
                                    key={title}
                                    title={title}
                                    icon={icon}
                                />
                            ))}
                        </HStack>

                        <Spacer />

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
                    <Heading
                        fontSize={{ base: '2xl', lg: '5xl' }}
                        fontWeight='bold'
                        mb={6}
                        maxW={{ base: '100%', '2xl': '80%' }}
                    >
                        {title}
                    </Heading>

                    <Text maxW={{ base: '100%', '2xl': '90%' }}>{description}</Text>
                </CardBody>

                <CardFooter as={Flex} flexWrap='wrap' w={SIZES.full} alignItems='end' gap={3} p={0}>
                    <Tag h={5} py={0.5} px={{ base: 1, lg: 2 }} bg={COLORS_BLACK_ALPHA[100]}>
                        <TagLeftIcon as={TimerIcon} />
                        <TagLabel>{time} минут</TagLabel>
                    </Tag>

                    <Spacer />

                    {isUserAuthor ? (
                        <HStack>
                            <IconButton
                                aria-label='delete recipe'
                                icon={<DeleteIcon />}
                                variant={STYLE_VARIANTS.none}
                                onClick={onDeleteRecipeClick}
                            />

                            <Button
                                variant={STYLE_VARIANTS.outline}
                                leftIcon={<EditIcon />}
                                onClick={onEditRecipeClick}
                            >
                                Редактировать рецепт
                            </Button>
                        </HStack>
                    ) : (
                        <HStack gap={3}>
                            <Button
                                size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                                leftIcon={<FavoriteIcon />}
                                variant={STYLE_VARIANTS.outline}
                                borderColor={COLORS_BLACK_ALPHA[600]}
                                color={COLORS_BLACK_ALPHA[800]}
                                fontWeight='semibold'
                                onClick={onLikeRecipeClick}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                                leftIcon={<LikeIcon />}
                                fontWeight='semibold'
                                background={COLORS_LIME[400]}
                                onClick={onBookmarkRecipeClick}
                            >
                                Сохранить в закладки
                            </Button>
                        </HStack>
                    )}
                </CardFooter>
            </VStack>
        </Card>
    );
};
