import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';

import { INPUT_ERROR_POSITION } from '~/constants/styles';

export type InputAuthProps = {
    isInvalid: boolean;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    testId: string;
    setValue: SetFieldValue<FieldValues>;
    hint?: string;
    error?: string;
};

export const InputAuth: React.FC<InputAuthProps> = ({
    isInvalid,
    label,
    placeholder,
    register,
    testId,
    setValue,
    hint,
    error,
}) => {
    const { name: fieldName } = register;

    const trimOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const trimmedValue = event.target.value.trim();

        setValue(fieldName, trimmedValue);
    };

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel mb={1}>{label}</FormLabel>
            <Input
                placeholder={placeholder}
                {...register}
                variant='authInput'
                size='lg'
                data-test-id={testId}
                onBlur={trimOnBlur}
            />
            <FormHelperText mt={1}>{hint}</FormHelperText>
            <FormErrorMessage position='absolute' bottom={INPUT_ERROR_POSITION}>
                {error}
            </FormErrorMessage>
        </FormControl>
    );
};
