import {
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

import { COLORS, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES, SIZES_NUMBER_INPUT } from '~/constants/styles/sizes';
import { AppInputProps } from '~/types/props';

type AppNumberInputProps = Omit<
    AppInputProps,
    'testId' | 'variant' | 'placeholder' | 'setValue'
> & {
    withStepper?: boolean;
    placeholder?: string;
};

export const AppNumberInput: React.FC<AppNumberInputProps> = ({
    register,
    isInvalid,
    withStepper,
    placeholder,
}) => (
    <FormControl isInvalid={isInvalid} w={SIZES.auto}>
        <NumberInput
            w={
                withStepper
                    ? SIZES_NUMBER_INPUT.widthWithStepper
                    : SIZES_NUMBER_INPUT.widthWithoutStepper
            }
        >
            <NumberInputField
                {...register}
                step={1}
                min={1}
                _invalid={{ borderColor: COLORS.red, boxShadow: 'none' }}
                _focus={{ borderColor: COLORS_LIME[150] }}
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

/*     

    const handleChange = (_: string, valueAsNumber: number) => {
        setValue(valueAsNumber);
    }; */
