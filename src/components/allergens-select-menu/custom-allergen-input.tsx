import { HStack, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addAllergen, selectAllergens } from '~/store/slices/allergens-slice';

import { PlusIcon } from '../icons';

export const CustomAllergenInput: React.FC = () => {
    const [customAllergen, setCustomAllergen] = useState('');

    const { selectedAllergensList } = useAppSelector(selectAllergens);
    const dispatch = useAppDispatch();

    const onCustomAllergenInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAllergen(event.target.value);
    };

    const handleAddCustomAllergen = () => {
        const currAlergen = customAllergen.trim().toLowerCase();
        if (currAlergen && !selectedAllergensList.includes(currAlergen)) {
            dispatch(addAllergen(customAllergen));
            setCustomAllergen('');
        }
    };
    return (
        <HStack py={2} pl={6} pr={2}>
            <Input
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
