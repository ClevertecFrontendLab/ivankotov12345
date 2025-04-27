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

import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/colors';
import { RecipeType } from '~/types/recipe';

import { CardBadge } from '../../../../components/card-badge';
import { FavoriteIcon, LikeIcon, TimerIcon } from '../../../../components/icons';
import { StatButton } from '../../../../components/stat-button';

export type RecipePageCardProps = Pick<
    RecipeType,
    'image' | 'title' | 'description' | 'category' | 'bookmarks' | 'likes' | 'time'
>;

export const RecipePageCard: React.FC<RecipePageCardProps> = ({
    image,
    title,
    description,
    category,
    bookmarks,
    likes,
    time,
}) => (
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
            src={image}
            alt={title}
            borderRadius='lg'
            overflow='hidden'
            objectFit='cover'
        />

        <VStack alignItems='start'>
            <CardHeader w='full' p={0}>
                <Flex>
                    <HStack flexWrap='wrap'>
                        {category.map((item) => (
                            <CardBadge backgroundColor='lime.50' key={item} category={item} />
                        ))}
                    </HStack>

                    <Spacer />

                    {bookmarks && (
                        <StatButton
                            quantity={bookmarks}
                            icon={<LikeIcon />}
                            size={{ base: 'xs', lg: 'sm' }}
                        />
                    )}
                    {likes && (
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
                    <TagLabel>{time}</TagLabel>
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
