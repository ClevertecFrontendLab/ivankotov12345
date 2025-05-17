import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { INPUT_ERROR_POSITION } from '~/constants/styles';

export type InputFormProps = {
    isInvalid: boolean;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    hint?: string;
    error?: string;
};

export const InputAuth: React.FC<InputFormProps> = ({
    isInvalid,
    label,
    placeholder,
    register,
    hint,
    error,
}) => (
    <FormControl isInvalid={isInvalid}>
        <FormLabel mb={1}>{label}</FormLabel>
        <Input placeholder={placeholder} {...register} variant='authInput' size='lg' />
        <FormHelperText mt={1}>{hint}</FormHelperText>
        <FormErrorMessage position='absolute' bottom={INPUT_ERROR_POSITION}>
            {error}
        </FormErrorMessage>
    </FormControl>
);
