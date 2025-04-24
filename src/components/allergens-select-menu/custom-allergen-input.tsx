import { HStack, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addAllergen, selectAllergensFilter } from '~/store/slices/filters-slice';

import { PlusIcon } from '../icons';

export const CustomAllergenInput: React.FC = () => {
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
                value={customAllergen}
                onChange={onCustomAllergenInputChange}
            />
            <IconButton
                size='sm'
                variant='none'
                icon={<PlusIcon />}
                aria-label='add'
                onClick={handleAddCustomAllergen}
            />
        </HStack>
    );
};
