import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';

import { BlogCard } from '~/components/blog-card';
import { Сarousel } from '~/components/carousel';
import { Loader } from '~/components/loader';
import { BLOG_CARD_TYPE } from '~/constants/blog-card-data';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetBloggersQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { BASE_LIMIT, BUTTON_TEXT, LIMIT_ALL } from './constants';

export const BlogsPage: React.FC = () => {
    const [limit, setLimit] = useState<string | number>(BASE_LIMIT);
    const { state } = useLocation();

    const isLargeScreen = useBreakpointValue({ base: false, '2xl': true });
    const userId = useAppSelector(selectUserId);

    const { data, isLoading, isError } = useGetBloggersQuery(
        { limit: limit, currentUserId: userId ?? '' },
        { refetchOnMountOrArgChange: true },
    );

    const toggleOnBlogsClick = () =>
        limit === BASE_LIMIT ? setLimit(LIMIT_ALL) : setLimit(BASE_LIMIT);

    const favoriteBloggers = data?.favorites ?? [];
    const anyBlogger = data?.others ?? [];

    const displayedAnyBloggers =
        limit === BASE_LIMIT && !isLargeScreen ? anyBlogger.slice(0, 8) : anyBlogger;

    if (isError) {
        return <Navigate to={state?.from ?? ROUTER_PATHS.homePage} />;
    }

    return (
        <VStack mt={8} mb={{ base: 20, lg: 0 }} gap={0}>
            <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' mb={6}>
                Кулинарные блоги
            </Heading>

            {limit === BASE_LIMIT && (
                <Box
                    borderRadius='2xl'
                    background={COLORS_LIME[300]}
                    mb={10}
                    p={6}
                    data-test-id={DATA_TEST_ID.blogsFavoritesBox}
                >
                    <Heading mb={4} fontSize={{ base: '2xl', xl: '4xl' }} fontWeight='normal'>
                        Избранные блоги
                    </Heading>

                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        gap={4}
                        data-test-id={DATA_TEST_ID.blogsFavoritesGrid}
                    >
                        {favoriteBloggers &&
                            favoriteBloggers.map((blogCardItem) => (
                                <BlogCard
                                    key={blogCardItem._id}
                                    {...blogCardItem}
                                    cardType={BLOG_CARD_TYPE.favoritesBlogger}
                                />
                            ))}
                    </SimpleGrid>
                </Box>
            )}

            <VStack
                w={SIZES.full}
                p={6}
                gap={6}
                borderRadius='2xl'
                background={COLORS_BLACK_ALPHA[50]}
                data-test-id={DATA_TEST_ID.blogsOthersBox}
            >
                <SimpleGrid
                    w={SIZES.full}
                    columns={{ base: 1, md: 2, '2xl': 3 }}
                    rowGap={6}
                    columnGap={4}
                    data-test-id={DATA_TEST_ID.blogsOthersGrid}
                >
                    {displayedAnyBloggers &&
                        displayedAnyBloggers.map((blogCardItem) => (
                            <BlogCard
                                key={blogCardItem._id}
                                {...blogCardItem}
                                cardType={BLOG_CARD_TYPE.anyBlogger}
                            />
                        ))}
                </SimpleGrid>

                <Button
                    rightIcon={limit === BASE_LIMIT ? <ArrowForwardIcon /> : undefined}
                    leftIcon={limit === LIMIT_ALL ? <ArrowBackIcon /> : undefined}
                    variant={STYLE_VARIANTS.none}
                    size='lg'
                    onClick={toggleOnBlogsClick}
                    data-test-id={DATA_TEST_ID.blogsOthersButton}
                >
                    {limit === BASE_LIMIT ? BUTTON_TEXT.allAuthors : BUTTON_TEXT.collapse}
                </Button>
            </VStack>

            <Box w={SIZES.full}>
                <Сarousel />
            </Box>

            {isLoading && <Loader isLoading={true} />}
        </VStack>
    );
};
