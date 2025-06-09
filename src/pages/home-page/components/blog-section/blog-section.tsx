import { Box, Flex, Heading, SimpleGrid, Spacer, useMediaQuery } from '@chakra-ui/react';

import { BlogCard } from '~/components/blog-card';
import { PAGE_TITLES } from '~/constants/page-titles';
import { COLORS_LIME } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetBloggersQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { BlogSectionButton } from './blog-section-button';

const { title } = PAGE_TITLES.blog;

export const BlogSection: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');

    const userId = useAppSelector(selectUserId);

    const { data } = useGetBloggersQuery({ limit: '', currentUserId: userId }, { skip: !userId });

    const bloggersList = data?.others ?? [];
    return (
        <>
            {bloggersList.length > 0 && (
                <Box
                    as='section'
                    mb={{ base: 6, lg: 10 }}
                    p={{ base: 3, lg: 6 }}
                    borderRadius='2xl'
                    bg={COLORS_LIME[300]}
                    data-test-id={DATA_TEST_ID.mainPageBlogsBox}
                >
                    <Flex mb={{ base: 4, '2xl': 6 }}>
                        <Heading as='h2' fontSize={{ base: '2xl', lg: '4xl' }} lineHeight='none'>
                            {title}
                        </Heading>

                        <Spacer />

                        {!isTablet && <BlogSectionButton />}
                    </Flex>

                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={{ base: 2, md: 4 }}
                        data-test-id={DATA_TEST_ID.mainPageBlogsGrid}
                    >
                        {bloggersList.map((props) => (
                            <BlogCard key={props._id} {...props} cardType='homePageBlogger' />
                        ))}
                    </SimpleGrid>

                    {isTablet && (
                        <Flex justifyContent='center' pt={3}>
                            <BlogSectionButton />
                        </Flex>
                    )}
                </Box>
            )}
        </>
    );
};
