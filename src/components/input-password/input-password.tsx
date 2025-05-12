import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputPasswordProps = {
    placeholder: string;
    register: UseFormRegisterReturn;
};

export const InputPassword: React.FC<InputPasswordProps> = ({ placeholder, register }) => {
    const [isPasswordVisible, setIsPassowrdVisible] = useState(false);

    const toggleButtonVisible = () => setIsPassowrdVisible(!isPasswordVisible);
    return (
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
    );
};
