import { Box } from '@chakra-ui/react';

import { BlogSection } from '~/components/blog-section';
import { Сarousel } from '~/components/carousel/carousel';
import { JuiciestSection } from '~/components/juiciest-section';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { PAGE_TITLES } from '~/constants/page-titles';

const { title } = PAGE_TITLES.home;

export const HomePage: React.FC = () => (
    <Box>
        <PageHeader title={title} />
        <Сarousel />
        <JuiciestSection />
        <BlogSection />
        <RelevantSection />
    </Box>
);
