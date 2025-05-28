import { FormControl, Textarea } from '@chakra-ui/react';

import { COLORS, COLORS_LIME } from '~/constants/styles/colors';
import { trimOnBlur } from '~/helpers/trim-on-blur';
import { AppInputProps } from '~/types/props';

type AppTextareaProps = Omit<AppInputProps, 'testId' | 'variant'>;

export const AppTextarea: React.FC<AppTextareaProps> = ({
    register,
    placeholder,
    isInvalid,
    setValue,
}) => (
    <FormControl isInvalid={isInvalid}>
        <Textarea
            fontSize='sm'
            {...register}
            placeholder={placeholder}
            onBlur={trimOnBlur(register.name, setValue)}
            _invalid={{ borderColor: COLORS.red, boxShadow: 'none' }}
            _focus={{ borderColor: COLORS_LIME[150] }}
        />
    </FormControl>
);
