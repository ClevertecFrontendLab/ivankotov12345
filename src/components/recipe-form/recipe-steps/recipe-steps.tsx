import { DeleteIcon } from '@chakra-ui/icons';
import {
    Button,
    Card,
    CardBody,
    Flex,
    IconButton,
    Spacer,
    Tag,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';

import { AppTextarea } from '~/components/form-fields';
import { LoadImage } from '~/components/form-fields/load-image';
import { PlusIcon } from '~/components/icons';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeFormProps } from '~/types/props';

export const RecipeSteps: React.FC<RecipeFormProps> = ({ control, register, setValue, errors }) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'steps',
    });

    const appendStep = () => {
        const stepsLength = fields.length;
        append({
            stepNumber: stepsLength + 1,
            description: null,
            image: null,
        });
    };

    const removeStep = (index: number) => {
        remove(index),
            fields.forEach((field, i) => {
                if (i >= index) {
                    update(i, { ...field, stepNumber: i + 1 });
                }
            });
    };

    return (
        <VStack gap={4} mt={10}>
            <Text variant={STYLE_VARIANTS.inputLabel} alignSelf='start'>
                Добавьте шаги приготовления
            </Text>

            {fields.map(({ stepNumber, id }, index) => (
                <Card key={id} flexDir='row' w={SIZES.full}>
                    <LoadImage control={control} name={`steps.${index}.image`} />

                    <CardBody p={4} flex={SIZES.flexFull}>
                        <Flex mb={4}>
                            <Tag>Шаг {stepNumber}</Tag>
                            <Spacer />

                            {index > 0 && (
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => removeStep(index)}
                                    aria-label='remove'
                                />
                            )}
                        </Flex>

                        <AppTextarea
                            placeholder={PLACEHOLDERS.step}
                            register={register(`steps.${index}.description`)}
                            setValue={setValue}
                            isInvalid={!!errors.steps?.[index]?.description}
                        />
                    </CardBody>
                </Card>
            ))}

            <Button
                variant={STYLE_VARIANTS.outline}
                borderColor={COLORS_BLACK_ALPHA[600]}
                size='sm'
                onClick={appendStep}
                rightIcon={<PlusIcon fill='black' />}
                alignSelf='end'
            >
                Новый шаг
            </Button>
        </VStack>
    );
};
