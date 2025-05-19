import {
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { Ingredient } from '~/types/recipe';

type IngredientsTableProps = {
    ingredients: Ingredient[];
    portions?: number;
};

export const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients, portions }) => {
    const [inputPortions, setInputPortions] = useState(portions || 1);
    const [currentIngredients, setCurrentIngredients] = useState(ingredients);

    const getOnePortionSize = (count: string, portions: number = 1) => +count / portions;

    const onPortionsChange = (_: string, value: number) => {
        const updated = currentIngredients.map((ingredient) => ({
            ...ingredient,
            count: `${getOnePortionSize(ingredient.count, inputPortions) * value}`,
        }));

        setCurrentIngredients(updated);
        setInputPortions(value);
    };

    return (
        <Table colorScheme='blackAlpha'>
            <Thead>
                <Tr>
                    <Th>
                        <Text variant='limeUppercase'>Ингредиенты</Text>
                    </Th>
                    <Th px={0}>
                        <HStack justifyContent='end'>
                            <Text variant='limeUppercase'>Порций</Text>

                            <NumberInput
                                value={inputPortions}
                                min={1}
                                onChange={onPortionsChange}
                                w={24}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper
                                        data-test-id={DATA_TEST_ID.incrementStepper}
                                    />
                                    <NumberDecrementStepper
                                        data-test-id={DATA_TEST_ID.decrementStepper}
                                    />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                    </Th>
                </Tr>
            </Thead>

            <Tbody fontSize='sm' fontWeight='medium' color={COLORS_BLACK_ALPHA[900]}>
                {currentIngredients.map(({ title, count, measureUnit }, index) => (
                    <Tr key={title} bg={index % 2 === 0 ? COLORS_BLACK_ALPHA[100] : COLORS.white}>
                        <Td border='none'>{title}</Td>
                        <Td display='flex' justifyContent='end' border='none'>
                            <Text
                                data-test-id={`${DATA_TEST_ID.ingredientsQuantity}-${index}`}
                                textAlign='end'
                            >
                                {+count > 0 && count} {measureUnit}
                            </Text>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
