import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';

import { BLOG_CARD_DATA } from '~/constants/blog-card-data';
import { PAGE_TITLES } from '~/constants/page-titles';

import { BlogCard } from './blog-card';

const { title } = PAGE_TITLES.blog;

export const BlogSection: React.FC = () => (
    <Box as='section' mb={10} p={6} borderRadius='2xl' bg='lime.300'>
        <Flex mb={6}>
            <Heading as='h2' variant='section'>
                {title}
            </Heading>

            <Spacer />

            <Button variant='ghost' rightIcon={<ArrowForwardIcon />}>
                Все авторы
            </Button>
        </Flex>

        <SimpleGrid columns={3} spacing={4}>
            {BLOG_CARD_DATA.map((props) => (
                <BlogCard key={props.id} {...props} />
            ))}
        </SimpleGrid>
    </Box>
);
