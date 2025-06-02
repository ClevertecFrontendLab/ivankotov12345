import { FormControl, Textarea } from '@chakra-ui/react';

import { COLORS } from '~/constants/styles/colors';
import { trimOnBlur } from '~/helpers/trim-on-blur';
import { AppInputProps } from '~/types/props';

type AppTextareaProps = Omit<AppInputProps, 'variant'>;

export const AppTextarea: React.FC<AppTextareaProps> = ({
    register,
    placeholder,
    isInvalid,
    setValue,
    testId,
}) => (
    <FormControl isInvalid={isInvalid}>
        <Textarea
            fontSize='sm'
            {...register}
            placeholder={placeholder}
            _focusVisible='none'
            onBlur={trimOnBlur(register.name, setValue)}
            _invalid={{ borderColor: COLORS.red, boxShadow: 'none' }}
            data-test-id={testId}
        />
    </FormControl>
);
