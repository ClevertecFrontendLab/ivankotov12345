import { Checkbox } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergens } from '~/store/slices/allergens-slice';
import { addAllergen, removeAllergen, selectAllergensFilter } from '~/store/slices/filters-slice';

type AllergenCheckboxPropsType = {
    item: string;
    label: string;
    index: number;
    focusCustomAllergern: () => void;
};

export const AllergenCheckbox: React.FC<AllergenCheckboxPropsType> = ({
    item,
    label,
    index,
    focusCustomAllergern,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const { isDisabled } = useAppSelector(selectAllergens);
    const dispatch = useAppDispatch();

    const toggleAllergen = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        if (selectedAllergens.includes(value)) {
            dispatch(removeAllergen(value));
            setIsChecked(false);
        } else {
            dispatch(addAllergen(value));
            setIsChecked(true);
        }
        focusCustomAllergern();
    };

    useEffect(() => {
        if (isDisabled) {
            setIsChecked(false);
        }
    }, [isDisabled, setIsChecked]);
    return (
        <Checkbox
            name='allergen'
            variant='limeCheckbox'
            value={item}
            onChange={toggleAllergen}
            data-test-id={`allergen-${index}`}
            isChecked={isChecked}
        >
            {label}
        </Checkbox>
    );
};
