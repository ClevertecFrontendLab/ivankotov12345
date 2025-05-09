import { Box } from '@chakra-ui/react';

import { RelevantSection } from '~/components/relevant-section';
import { TabsSection } from '~/pages/category-page/components/tabs-section';

export const CategoryPage: React.FC = () => (
    <Box>
        <TabsSection />
        <RelevantSection />
    </Box>
);
