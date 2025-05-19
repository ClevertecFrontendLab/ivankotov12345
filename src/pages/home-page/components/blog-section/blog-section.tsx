import { Box, Flex, Heading, SimpleGrid, Spacer, useMediaQuery } from '@chakra-ui/react';

import { BLOG_CARD_DATA } from '~/constants/blog-card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { COLORS_LIME } from '~/constants/styles/colors';

import { BlogCard } from './blog-card';
import { BlogSectionButton } from './blog-section-button';

const { title } = PAGE_TITLES.blog;

export const BlogSection: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');

    return (
        <Box
            as='section'
            mb={{ base: 6, lg: 10 }}
            p={{ base: 3, lg: 6 }}
            borderRadius='2xl'
            bg={COLORS_LIME[300]}
        >
            <Flex mb={{ base: 4, '2xl': 6 }}>
                <Heading as='h2' fontSize={{ base: '2xl', lg: '4xl' }} lineHeight='none'>
                    {title}
                </Heading>

                <Spacer />

                {!isTablet && <BlogSectionButton />}
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 2, md: 4 }}>
                {BLOG_CARD_DATA.map((props) => (
                    <BlogCard key={props.id} {...props} />
                ))}
            </SimpleGrid>

            {isTablet && (
                <Flex justifyContent='center' pt={3}>
                    <BlogSectionButton />
                </Flex>
            )}
        </Box>
    );
};
