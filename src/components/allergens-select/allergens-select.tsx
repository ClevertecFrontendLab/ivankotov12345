import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
    Text,
} from '@chakra-ui/react';

import { ALLERGENS_LIST } from '~/constants/allergens-list';

import { PlusIcon } from '../icons';

export const AllergensSelect: React.FC = () => (
    <>
        <HStack gap={3}>
            <Text whiteSpace='nowrap' fontWeight='medium'>
                Исключить мои аллергены
            </Text>
            <Switch />
        </HStack>

        <Menu matchWidth closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='menuButton'>
                Выберите из списка...
            </MenuButton>

            <MenuList boxShadow='selectBoxShadow' border='none'>
                {ALLERGENS_LIST.map((allergen, index) => (
                    <MenuItem
                        key={allergen}
                        gap={2}
                        background={index % 2 ? 'white' : 'blackAlpha.100'}
                        px={4}
                        py={1.5}
                    >
                        <Checkbox variant='limeCheckbox'>{allergen}</Checkbox>
                    </MenuItem>
                ))}

                <HStack py={2} pl={6} pr={2}>
                    <Input placeholder='Другой аллерген' size='sm' borderRadius='base' />
                    <IconButton size='sm' variant='none' icon={<PlusIcon />} aria-label='add' />
                </HStack>
            </MenuList>
        </Menu>
    </>
);
