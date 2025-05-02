import { Box } from '@chakra-ui/react';

import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { PAGE_TITLES } from '~/constants/page-titles';
import { TabsSection } from '~/pages/category-page/components/tabs-section';

const { title: veganPageTitle, subtitle: veganPageSubtitle } = PAGE_TITLES.vegan;

export const CategoryPage: React.FC = () => (
    <Box>
        <PageHeader title={veganPageTitle} subtitle={veganPageSubtitle} />
        <TabsSection />
        <RelevantSection />
    </Box>
);
