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

import { IngredientType } from '~/types/recepie';

type IngredientsTableProps = {
    ingredients: IngredientType[];
    portions?: number;
};

export const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients, portions }) => (
    <Table variant='striped' colorScheme='blackAlpha'>
        <Thead>
            <Tr>
                <Th>
                    <Text variant='limeUppercase'>Ингредиенты</Text>
                </Th>
                <Th px={0}>
                    <HStack justifyContent='end'>
                        <Text variant='limeUppercase'>Порций</Text>

                        <NumberInput value={portions || 0} w={24}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                </Th>
            </Tr>
        </Thead>

        <Tbody>
            {ingredients.map(({ title, count, measureUnit }) => (
                <Tr key={title}>
                    <Td>{title}</Td>
                    <Td display='flex' justifyContent='end'>
                        {+count > 0 && count} {measureUnit}
                    </Td>
                </Tr>
            ))}
        </Tbody>
    </Table>
);
