import { Box } from '@chakra-ui/react';

import { BlogSection } from '~/components/blog-section';
import { CardsWrapper } from '~/components/cards-wrapper';
import { Сarousel } from '~/components/carousel';
import { FoodCard } from '~/components/food-card';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';
import { useAllergenFilter } from '~/hooks/use-allergen-filters';
import { JuiciestSection } from '~/pages/category-page/components/juiciest-section';
import { useAppSelector } from '~/store/hooks';
import { selectRecipes } from '~/store/slices/recipe-slice';

const { title: homePageTitle } = PAGE_TITLES.home;
const { title: veganPageTitle, subtitle: veganPageSubTitle } = PAGE_TITLES.vegan;

export const HomePage: React.FC = () => {
    const { filteredRecipes } = useAppSelector(selectRecipes);

    useAllergenFilter(CARD_DATA);
    return (
        <Box>
            <PageHeader title={homePageTitle} />

            {filteredRecipes.length === 0 ? (
                <>
                    <Сarousel />
                    <JuiciestSection />
                    <BlogSection />
                    <RelevantSection
                        title={veganPageTitle}
                        subtitle={veganPageSubTitle}
                        cardData={VEGAN_RELEVANT_CARD_DATA}
                        cardDataMini={VEGAN_RELEVANT_CARD_DATA_MINI}
                    />
                </>
            ) : (
                <CardsWrapper>
                    {filteredRecipes.map((card, index) => (
                        <FoodCard key={card.id} {...card} index={index} />
                    ))}
                </CardsWrapper>
            )}
        </Box>
    );
};
