import { Card, CardBody, Image, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { RecepieStepType } from '~/types/recepie';

export const StepCard: React.FC<RecepieStepType & { background: string }> = ({
    stepNumber,
    description,
    image,
    background,
}) => (
    <Card direction='row' w='full' variant='outline'>
        {image && <Image src={image} alt={description} />}

        <CardBody as={VStack} alignItems='start' py={5} px={6}>
            <Tag py={0.5} px={2} bg={background}>
                <TagLabel>Шаг {stepNumber}</TagLabel>
            </Tag>

            <Text>{description}</Text>
        </CardBody>
    </Card>
);
