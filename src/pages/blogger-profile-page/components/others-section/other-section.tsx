import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, SimpleGrid } from '@chakra-ui/react';
import { Navigate, NavLink, useLocation } from 'react-router';

import { BlogCard } from '~/components/blog-card';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetBloggersQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

export const OtherSection: React.FC = () => {
    const { pathname } = useLocation();

    const userId = useAppSelector(selectUserId);
    const { data, error } = useGetBloggersQuery(
        { limit: '', currentUserId: userId ?? '' },
        { refetchOnMountOrArgChange: true },
    );

    const bloggersList = data?.others ?? [];

    if (error) {
        return <Navigate to={ROUTER_PATHS.homePage} />;
    }
    return (
        <Box as='section' mt={10} mb={{ base: 24, lg: 6 }}>
            <HStack justifyContent='space-between' my={6}>
                <Heading variant={STYLE_VARIANTS.sectionHeading}>Другие блоги</Heading>

                <Button
                    as={NavLink}
                    to={ROUTER_PATHS.blogs}
                    state={{ from: pathname }}
                    variant={STYLE_VARIANTS.none}
                    rightIcon={<ArrowForwardIcon />}
                    data-test-id={DATA_TEST_ID.bloggerUserOtherBlogsButton}
                >
                    Всe авторы
                </Button>
            </HStack>

            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap={4}
                data-test-id={DATA_TEST_ID.bloggerUserOtherBlogsGrid}
            >
                {bloggersList.map((blogger) => (
                    <BlogCard key={blogger._id} cardType='otherBlogger' {...blogger} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
