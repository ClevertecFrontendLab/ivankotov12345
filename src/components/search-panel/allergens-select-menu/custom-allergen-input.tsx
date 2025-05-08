import { HStack, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addAllergen, removeIsFiltered, selectAllergensFilter } from '~/store/slices/filters-slice';

import { PlusIcon } from '../../icons';

type CustomAllergenInputProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    isOpen: boolean;
};

export const CustomAllergenInput: React.FC<CustomAllergenInputProps> = ({ inputRef, isOpen }) => {
    const [customAllergen, setCustomAllergen] = useState('');

    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const dispatch = useAppDispatch();

    const onCustomAllergenInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAllergen(event.target.value);
    };

    const handleAddCustomAllergen = () => {
        const currAlergen = customAllergen.trim().toLowerCase();
        dispatch(removeIsFiltered());
        if (currAlergen && !selectedAllergens.includes(currAlergen)) {
            dispatch(addAllergen(customAllergen));
            setCustomAllergen('');
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
                placeholder={PLACEHOLDERS.differentAllergen}
                size='sm'
                borderRadius='base'
                onChange={onCustomAllergenInputChange}
                data-test-id={isOpen && DATA_TEST_ID.addOtherAllergen}
                _focus={{
                    borderColor: COLORS_BLACK_ALPHA[200],
                }}
                onKeyDown={handleKeyDown}
                value={customAllergen}
                ref={inputRef}
            />

            <IconButton
                size='sm'
                variant='none'
                icon={<PlusIcon />}
                aria-label='add'
                onClick={handleAddCustomAllergen}
                data-test-id={isOpen && DATA_TEST_ID.addAllergenButton}
            />
        </HStack>
    );
};
