import { Card, CardBody, Image, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { SIZES, STEP_CARD_IMAGE_SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { RecipeStep } from '~/types/recipe';

export const StepCard: React.FC<RecipeStep & { background: string }> = ({
    stepNumber,
    description,
    image,
    background,
}) => (
    <Card
        direction='row'
        w={SIZES.full}
        variant={STYLE_VARIANTS.outline}
        borderRadius='lg'
        overflow='hidden'
    >
        {image && (
            <Image
                src={getFullImagePath(image)}
                alt={description}
                w={{ base: STEP_CARD_IMAGE_SIZES.base, lg: STEP_CARD_IMAGE_SIZES.lg }}
                h={{
                    base: STEP_CARD_IMAGE_SIZES.heightImageBase,
                    lg: STEP_CARD_IMAGE_SIZES.heightImageMd,
                }}
                objectFit='cover'
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
