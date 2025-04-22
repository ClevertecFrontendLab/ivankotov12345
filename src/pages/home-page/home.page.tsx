import { Box } from '@chakra-ui/react';

import { BlogSection } from '~/components/blog-section';
import { Сarousel } from '~/components/carousel';
import { JuiciestSection } from '~/components/juiciest-section';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';
import { useAppSelector } from '~/store/hooks';
import { selectFilteredRecipes } from '~/store/slices/flter-recipe-slice';

const { title: homePageTitle } = PAGE_TITLES.home;
const { title: veganPageTitle, subtitle: veganPageSubTitle } = PAGE_TITLES.vegan;

export const HomePage: React.FC = () => {
    const { isFiltered } = useAppSelector(selectFilteredRecipes);
    return (
        <Box>
            <PageHeader title={homePageTitle} />
            {!isFiltered && <Сarousel />}
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
};
