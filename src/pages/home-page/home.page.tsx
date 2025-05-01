import { Box } from '@chakra-ui/react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { Сarousel } from '~/components/carousel';
import { PageHeader } from '~/components/page-header';
import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { useAllergenFilter } from '~/hooks/use-allergen-filters';
import { useAppSelector } from '~/store/hooks';
import { selectRecipes } from '~/store/slices/recipe-slice';

import { JuiciestSection } from './components/juiciest-section';

const { title: homePageTitle } = PAGE_TITLES.home;
//const { title: veganPageTitle, subtitle: veganPageSubTitle } = PAGE_TITLES.vegan;

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
                    {/*                     <BlogSection />
                    <RelevantSection
                        title={veganPageTitle}
                        subtitle={veganPageSubTitle}
                        cardData={VEGAN_RELEVANT_CARD_DATA}
                        cardDataMini={VEGAN_RELEVANT_CARD_DATA_MINI}
                    /> */}
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
