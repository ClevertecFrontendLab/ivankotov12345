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
            <FormLabel mb={1}>{label}</FormLabel>

            <InputGroup>
                <Input
                    placeholder={placeholder}
                    {...register}
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant='authInput'
                    size='lg'
                />
                <InputRightElement h='full'>
                    <IconButton
                        onClick={toggleButtonVisible}
                        icon={isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
                        aria-label='show/hide password'
                        variant='none'
                    />
                </InputRightElement>
            </InputGroup>

            <FormHelperText mt={1}>{hint}</FormHelperText>
            <FormErrorMessage position='absolute' bottom='-15px'>
                {error}
            </FormErrorMessage>
        </FormControl>
    );
};
