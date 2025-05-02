import { Box } from '@chakra-ui/react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { Сarousel } from '~/components/carousel';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { useAllergenFilter } from '~/hooks/use-allergen-filters';
import { BlogSection } from '~/pages/home-page/components/blog-section';
import { useAppSelector } from '~/store/hooks';
import { selectRecipes } from '~/store/slices/recipe-slice';

import { JuiciestSection } from './components/juiciest-section';

const { title: homePageTitle } = PAGE_TITLES.home;

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
                    <RelevantSection />
                </>
            ) : (
                <CardsWrapper>
                    <div>123</div>
                    {/*                     {filteredRecipes.map((card, index) => (
                        <FoodCard key={card.id} {...card} index={index} />
                    ))} */}
                </CardsWrapper>
            )}
        </Box>
    );
};
