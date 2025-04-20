import { Box, Heading, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { Сarousel } from '~/components/carousel';
import { IngredientsTable } from '~/components/ingredients-table';
import { NutritionValueSection } from '~/components/nutrition-value-section';
import { RecepiePageCard } from '~/components/recepie-page-card';
import { StepCard } from '~/components/step-card';
import { UserCard } from '~/components/user-card';
import { CARD_DATA } from '~/constants/card-data';
import { RecepieType } from '~/types/recepie';

export const RecepiePage: React.FC = () => {
    const { pathname } = useLocation();

    const [, , currId] = pathname.split('/').filter(Boolean);
    const recepie = CARD_DATA.find(({ id }) => id === currId);

    const {
        image,
        title,
        description,
        category,
        bookmarks,
        likes,
        time,
        nutritionValue,
        ingredients,
        steps,
        portions,
    } = recepie as unknown as RecepieType;
    return (
        <VStack gap={10}>
            <RecepiePageCard
                image={image}
                title={title}
                description={description}
                category={category}
                bookmarks={bookmarks}
                likes={likes}
                time={time}
            />

            <VStack gap={10} maxW='recepieDetailsMaxWidth'>
                <NutritionValueSection {...nutritionValue} />
                <IngredientsTable ingredients={ingredients} portions={portions} />

                <VStack as='section' gap={5}>
                    <Heading variant='sectionHeader'>Шаги приготовления</Heading>
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.stepNumber}
                            {...step}
                            background={index === steps.length - 1 ? 'lime.50' : 'blackAlpha.100'}
                        />
                    ))}
                </VStack>

                <UserCard />
            </VStack>

            <Box w='full'>
                <Сarousel />
            </Box>
        </VStack>
    );
};
