import { Box, Button } from '@chakra-ui/react';
import React from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';
import { VEGAN_RELEVANT_CARD_DATA } from '~/constants/relevant-card-data';
import { VEGAN_RELEVANT_CARD_DATA_MINI } from '~/constants/relevant-card-data-mini';

const { title: juiciestPageTitle } = PAGE_TITLES.juiciest;
const { title: veganPageTitle, subtitle: veganPageSubTitle } = PAGE_TITLES.vegan;

export const JuiciestPage: React.FC = () => (
    <Box>
        <PageHeader title={juiciestPageTitle} />

        <CardsWrapper>
            {CARD_DATA.map((props) => (
                <FoodCard key={props.id} {...props} />
            ))}
        </CardsWrapper>

        <Button bg='lime.400'>Загрузить ещё</Button>

        <RelevantSection
            title={veganPageTitle}
            subtitle={veganPageSubTitle}
            cardData={VEGAN_RELEVANT_CARD_DATA}
            cardDataMini={VEGAN_RELEVANT_CARD_DATA_MINI}
        />
    </Box>
);
