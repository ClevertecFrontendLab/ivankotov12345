import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';

import { CardBadge } from '~/components/card-badge';
import { FavoriteIcon, LikeIcon, TimerIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/colors';
import { getCardCategories } from '~/helpers/get-card-categories';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { RecipeType } from '~/types/recipe';

export type RecipePageCardProps = Pick<
    RecipeType,
    'image' | 'title' | 'description' | 'categoriesIds' | 'bookmarks' | 'likes' | 'time'
>;

export const RecipePageCard: React.FC<RecipePageCardProps> = ({
    image,
    title,
    description,
    categoriesIds,
    bookmarks,
    likes,
    time,
}) => {
    const { categories, subCategories } = useAppSelector(selectCategory);

    const cardCategories = getCardCategories(categories, subCategories, categoriesIds);
    return (
        <Card
            flexDirection={{ base: 'column', md: 'row' }}
            w='full'
            gap={{ base: 4, lg: 6 }}
            variant='none'
            _hover={{
                boxShadow: 'none',
            }}
        >
            <Image
                maxW={{ base: 'full', md: 'recipeImageWidth.md', lg: 'recipeImageWidth.lg' }}
                w='full'
                height={{ base: 'auto', lg: 'imageHeight.xl' }}
                src={getFullImagePath(image)}
                alt={title}
                borderRadius='lg'
                overflow='hidden'
                objectFit='cover'
            />

            <VStack alignItems='start'>
                <CardHeader w='full' p={0}>
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

                <CardFooter as={Flex} flexWrap='wrap' w='full' alignItems='end' gap={3} p={0}>
                    <Tag h={5} py={0.5} px={{ base: 1, lg: 2 }} bg={COLORS_BLACK_ALPHA[100]}>
                        <TagLeftIcon as={TimerIcon} />
                        <TagLabel>{time} минут</TagLabel>
                    </Tag>

                    <Spacer />

                    <HStack gap={3}>
                        <Button
                            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                            leftIcon={<FavoriteIcon />}
                            variant='outline'
                            borderColor={COLORS_BLACK_ALPHA[600]}
                            color={COLORS_BLACK_ALPHA[800]}
                            fontWeight='semibold'
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                            leftIcon={<LikeIcon />}
                            fontWeight='semibold'
                            background={COLORS_LIME[400]}
                        >
                            Сохранить в закладки
                        </Button>
                    </HStack>
                </CardFooter>
            </VStack>
        </Card>
    );
};
