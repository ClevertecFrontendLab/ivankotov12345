import { HStack, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addAllergen, selectAllergensFilter } from '~/store/slices/filters-slice';

import { PlusIcon } from '../../icons';

type CustomAllergenInputProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
};

export const CustomAllergenInput: React.FC<CustomAllergenInputProps> = ({ inputRef }) => {
    const [customAllergen, setCustomAllergen] = useState('');

    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const dispatch = useAppDispatch();

    const onCustomAllergenInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAllergen(event.target.value);
    };

    const handleAddCustomAllergen = () => {
        const currAlergen = customAllergen.trim().toLowerCase();
        if (currAlergen && !selectedAllergens.includes(currAlergen)) {
            dispatch(addAllergen(customAllergen));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddCustomAllergen();
            setCustomAllergen('');
        }
    };
    return (
        <HStack py={2} pl={6} pr={2}>
            <Input
                name='custom allergen'
                placeholder='Другой аллерген'
                size='sm'
                borderRadius='base'
                onChange={onCustomAllergenInputChange}
                data-test-id='add-other-allergen'
                _focus={{
                    borderColor: 'blackAlpha.200',
                }}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />

            <IconButton
                size='sm'
                variant='none'
                icon={<PlusIcon />}
                aria-label='add'
                onClick={handleAddCustomAllergen}
                data-test-id='add-allergen-button'
            />
        </HStack>
    );
};
