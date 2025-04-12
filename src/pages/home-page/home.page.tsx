import { Box } from '@chakra-ui/react';

import { BlogSection } from '~/components/blog-section';
import { Сarousel } from '~/components/carousel/carousel';
import { JuiciestSection } from '~/components/juiciest-section';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';

const { title: homePageTitle } = PAGE_TITLES.home;
const { title: veganPageTitle, subtitle: veganPageSubTitle } = PAGE_TITLES.vegan;

export const HomePage: React.FC = () => (
    <Box>
        <PageHeader title={homePageTitle} />
        <Сarousel />
        <JuiciestSection />
        <BlogSection />
        <RelevantSection
            title={veganPageTitle}
            subtitle={veganPageSubTitle}
            cardData={VEGAN_RELEVANT_CARD_DATA}
            cardDataMini={VEGAN_RELEVANT_CARD_DATA_MINI}
        />
    </Box>
);
