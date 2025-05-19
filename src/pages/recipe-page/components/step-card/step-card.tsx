import { Card, CardBody, Image, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { STEP_CARD_IMAGE_MAX_WIDTH } from '~/constants/styles/sizes';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { RecipeStep } from '~/types/recipe';

export const StepCard: React.FC<RecipeStep & { background: string }> = ({
    stepNumber,
    description,
    image,
    background,
}) => (
    <Card direction='row' w='full' variant='outline' borderRadius='lg' overflow='hidden'>
        {image && (
            <Image
                src={getFullImagePath(image)}
                alt={description}
                w={{ base: STEP_CARD_IMAGE_MAX_WIDTH.base, lg: STEP_CARD_IMAGE_MAX_WIDTH.lg }}
                h={{ base: 'imageHeight.md', lg: 'auto' }}
            />
        )}

        <CardBody
            as={VStack}
            alignItems='start'
            py={{ base: 2, lg: 5 }}
            px={{ base: 2, lg: 6 }}
            gap={4}
        >
            <Tag py={0.5} px={2} bg={background}>
                <TagLabel>Шаг {stepNumber}</TagLabel>
            </Tag>

            <Text>{description}</Text>
        </CardBody>
    </Card>
);
