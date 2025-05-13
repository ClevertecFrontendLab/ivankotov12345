import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputFormProps = {
    isInvalid: boolean;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    hint?: string;
    error?: string;
};

export const InputAuthForm: React.FC<InputFormProps> = ({
    isInvalid,
    label,
    placeholder,
    register,
    hint,
    error,
}) => (
    <FormControl isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <Input placeholder={placeholder} {...register} />
        <FormHelperText>{hint}</FormHelperText>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
);
