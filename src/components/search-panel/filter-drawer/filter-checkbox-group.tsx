import { Checkbox, CheckboxGroup, Text, VStack } from '@chakra-ui/react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch } from '~/store/hooks';
import { FilterItem } from '~/types/filter-item';

type FilterCheckboxGroupProps = {
    description: string;
    itemsList: FilterItem[];
    addItem: ActionCreatorWithPayload<string, string>;
    removeItem: ActionCreatorWithPayload<string, string>;
};

export const FilterCheckboxGroup: React.FC<FilterCheckboxGroupProps> = ({
    description,
    itemsList,
    addItem,
    removeItem,
}) => {
    const dispatch = useAppDispatch();

    const toggleItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            dispatch(addItem(value));
        } else {
            dispatch(removeItem(value));
        }
    };
    return (
        <VStack gap={3} alignItems='start'>
            <Text fontWeight='medium'>{description}</Text>

            <CheckboxGroup>
                {itemsList.map(({ item, label }) => (
                    <Checkbox
                        variant='limeCheckbox'
                        key={item}
                        value={item}
                        onChange={toggleItem}
                        data-test-id={`${DATA_TEST_ID.checkbox}-${label.toLowerCase()}`}
                    >
                        {label}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </VStack>
    );
};
