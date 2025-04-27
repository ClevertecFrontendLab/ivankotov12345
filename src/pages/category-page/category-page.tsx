import { Box } from '@chakra-ui/react';

import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { PAGE_TITLES } from '~/constants/page-titles';
import { DESSERTS_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { DESSERTS_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';
import { TabsSection } from '~/pages/category-page/components/tabs-section';

const { title: veganPageTitle, subtitle: veganPageSubtitle } = PAGE_TITLES.vegan;
const { title: dessertsPageTitle, subtitle: dessertsPageSubtitle } = PAGE_TITLES.desserts;

export const CategoryPage: React.FC = () => (
    <Box>
        <PageHeader title={veganPageTitle} subtitle={veganPageSubtitle} />
        <TabsSection />
        <RelevantSection
            title={dessertsPageTitle}
            subtitle={dessertsPageSubtitle}
            cardData={DESSERTS_RELEVANT_CARD_DATA}
            cardDataMini={DESSERTS_RELEVANT_CARD_DATA_MINI}
        />
    </Box>
);
