import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

import { INPUT_ERROR_POSITION } from '~/constants/styles/styles';
import { trimOnBlur } from '~/helpers/trim-on-blur';
import { AppInputProps } from '~/types/props';

export const AppInput: React.FC<AppInputProps> = ({
    isInvalid,
    label,
    placeholder,
    register,
    testId,
    variant,
    setValue,
    hint,
    error,
}) => (
    <FormControl isInvalid={isInvalid}>
        {label && <FormLabel mb={1}>{label}</FormLabel>}
        <Input
            placeholder={placeholder}
            {...register}
            variant={variant}
            data-test-id={testId}
            onBlur={trimOnBlur(register.name, setValue)}
        />
        <FormHelperText mt={1}>{hint}</FormHelperText>
        <FormErrorMessage position='absolute' bottom={INPUT_ERROR_POSITION}>
            {error}
        </FormErrorMessage>
    </FormControl>
);
