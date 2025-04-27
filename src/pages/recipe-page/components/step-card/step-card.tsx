import { Card, CardBody, Image, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { RecipeStepType } from '~/types/recipe';

export const StepCard: React.FC<RecipeStepType & { background: string }> = ({
    stepNumber,
    description,
    image,
    background,
}) => (
    <Card direction='row' w='full' variant='outline' borderRadius='lg' overflow='hidden'>
        {image && (
            <Image src={image} alt={description} h={{ base: 'imageHeight.md', lg: 'auto' }} />
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
