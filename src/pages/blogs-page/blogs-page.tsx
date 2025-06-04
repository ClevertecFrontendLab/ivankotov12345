import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { BlogCard } from '~/components/blog-card';
import { Сarousel } from '~/components/carousel';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { useGetBloggersQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { BASE_LIMIT, BUTTON_TEXT } from './constants';

export const BlogsPage: React.FC = () => {
    const [limit, setLimit] = useState<string | number>(BASE_LIMIT);
    const userId = useAppSelector(selectUserId);
    const { data } = useGetBloggersQuery(
        { limit: limit, currentUserId: userId ?? '' },
        { refetchOnMountOrArgChange: true },
    );

    const toggleOnBlogsClick = () =>
        limit === BASE_LIMIT ? setLimit('all') : setLimit(BASE_LIMIT);

    const anyBlogger = data?.others;
    return (
        <VStack>
            <Heading>Кулинарные блоги</Heading>

            <VStack p={6} gap={6} borderRadius='2xl' background={COLORS_BLACK_ALPHA[50]}>
                <SimpleGrid columns={3} rowGap={6} columnGap={4}>
                    {anyBlogger &&
                        anyBlogger.map((blogCardItem) => (
                            <BlogCard key={blogCardItem._id} {...blogCardItem} />
                        ))}
                </SimpleGrid>

                <Button
                    rightIcon={<ArrowForwardIcon />}
                    variant={STYLE_VARIANTS.none}
                    size='lg'
                    onClick={toggleOnBlogsClick}
                >
                    {limit === BASE_LIMIT ? BUTTON_TEXT.allAuthors : BUTTON_TEXT.collapse}
                </Button>
            </VStack>

            <Box w={SIZES.full}>
                <Сarousel />
            </Box>
        </VStack>
    );
};
