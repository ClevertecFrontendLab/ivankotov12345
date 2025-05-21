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

import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { INPUT_ERROR_POSITION } from '~/constants/styles/styles';
import { DATA_TEST_ID } from '~/constants/test-id';

type InputPasswordProps = {
    placeholder: string;
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    testId: string;
    hint?: string;
    error?: string;
};

export const InputPassword: React.FC<InputPasswordProps> = ({
    placeholder,
    register,
    isInvalid,
    label,
    testId,
    hint,
    error,
}) => {
    const [isPasswordVisible, setIsPassowrdVisible] = useState(false);

    const onPasswordVisible = () => setIsPassowrdVisible(true);
    const onPasswordHidden = () => setIsPassowrdVisible(false);

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel mb={1}>{label}</FormLabel>

            <InputGroup>
                <Input
                    placeholder={placeholder}
                    {...register}
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant={STYLE_VARIANTS.authInput}
                    size='lg'
                    data-test-id={testId}
                />
                <InputRightElement h={SIZES.full}>
                    <IconButton
                        onMouseDown={onPasswordVisible}
                        onMouseUp={onPasswordHidden}
                        onMouseLeave={onPasswordHidden}
                        icon={isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
                        aria-label='show/hide password'
                        variant={STYLE_VARIANTS.none}
                        data-test-id={DATA_TEST_ID.passwordVisibilityButton}
                    />
                </InputRightElement>
            </InputGroup>

            <FormHelperText mt={1}>{hint}</FormHelperText>
            <FormErrorMessage position='absolute' bottom={INPUT_ERROR_POSITION}>
                {error}
            </FormErrorMessage>
        </FormControl>
    );
};
