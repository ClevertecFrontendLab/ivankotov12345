import {
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { Control, FieldPath, useController } from 'react-hook-form';

import { COLORS } from '~/constants/styles/colors';
import { SIZES, SIZES_NUMBER_INPUT } from '~/constants/styles/sizes';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';

type AppNumberInputProps = {
    control: Control<RecipeSchema>;
    name: FieldPath<RecipeSchema>;
    testId: string;
    isInvalid: boolean;
    withStepper?: boolean;
    placeholder?: string;
};

export const AppNumberInput: React.FC<AppNumberInputProps> = ({
    control,
    name,
    isInvalid,
    withStepper,
    placeholder,
    testId,
}) => {
    const { field } = useController({ control, name: name });

    const handleChange = (_valueAsString: string, valueAsNumber: number) => {
        field.onChange(valueAsNumber);
    };

    return (
        <FormControl isInvalid={isInvalid} w={SIZES.auto}>
            <NumberInput
                w={
                    withStepper
                        ? SIZES_NUMBER_INPUT.widthWithStepper
                        : SIZES_NUMBER_INPUT.widthWithoutStepper
                }
                value={(field.value as number) || undefined}
                onChange={handleChange}
            >
                <NumberInputField
                    step={1}
                    min={1}
                    _invalid={{ borderColor: COLORS.red, boxShadow: 'none' }}
                    _focusVisible='none'
                    data-test-id={testId}
                    placeholder={placeholder}
                />

                {withStepper && (
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                )}
            </NumberInput>
        </FormControl>
    );
};
