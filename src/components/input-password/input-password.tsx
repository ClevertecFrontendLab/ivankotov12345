import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputPasswordProps = {
    placeholder: string;
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    hint?: string;
    error?: string;
};

export const InputPassword: React.FC<InputPasswordProps> = ({
    placeholder,
    register,
    isInvalid,
    label,
    hint,
    error,
}) => {
    const [isPasswordVisible, setIsPassowrdVisible] = useState(false);

    const toggleButtonVisible = () => setIsPassowrdVisible(!isPasswordVisible);
    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>

            <InputGroup>
                <Input placeholder={placeholder} {...register} />
                <InputRightElement>
                    <IconButton
                        onClick={toggleButtonVisible}
                        icon={isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
                        aria-label='show/hide password'
                    />
                </InputRightElement>
            </InputGroup>

            <FormHelperText>{hint}</FormHelperText>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
