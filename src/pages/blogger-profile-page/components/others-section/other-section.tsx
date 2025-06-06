import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, SimpleGrid } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router';

import { BlogCard } from '~/components/blog-card';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { useGetBloggersQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

export const OtherSection: React.FC = () => {
    const navigate = useNavigate();

    const userId = useAppSelector(selectUserId);
    const { data, error } = useGetBloggersQuery(
        { limit: '', currentUserId: userId ?? '' },
        { refetchOnMountOrArgChange: true },
    );

    const onAllAuthorsClick = () => navigate(ROUTER_PATHS.blogs);

    const bloggersList = data?.others ?? [];

    if (error) {
        return <Navigate to={ROUTER_PATHS.homePage} />;
    }
    return (
        <Box as='section'>
            <HStack justifyContent='space-between'>
                <Heading variant={STYLE_VARIANTS.sectionHeading}>Другие блоги</Heading>

                <Button rightIcon={<ArrowForwardIcon />} onClick={onAllAuthorsClick}>
                    Все авторы
                </Button>
            </HStack>

            <SimpleGrid columns={3} gap={4}>
                {bloggersList.map((blogger) => (
                    <BlogCard key={blogger._id} cardType='anyBlogger' {...blogger} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
